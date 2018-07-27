import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import { ModalNuevoProcesoService } from '../../components/modal-nuevo-proceso/modal-nuevo-proceso.service';
import { URL_SERVICIOS } from '../../config/config';

import swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[] = [];
  desde:number = 0;
  totalRegistros:number = 0;
  cargando:boolean = true;
  URL_DOWNLOAD_EXCEL:string;
  URL_DOWNLOAD_PDF:string;

  constructor(public usuarioService: UsuarioService, public modalUploadService: ModalUploadService, public modalNuevoProcesoService: ModalNuevoProcesoService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.URL_DOWNLOAD_PDF = URL_SERVICIOS+'/download/PDF/usuarios';
    this.URL_DOWNLOAD_EXCEL = URL_SERVICIOS+'/download/XLS/usuarios';

    this.modalUploadService.notificacion.subscribe(resp =>{
      this.cargarUsuarios();    
    });
    this.modalNuevoProcesoService.notificacion.subscribe(resp =>{
      this.cargarUsuarios();
    });
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe((resp:any)=>{
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  nuevoUsuario(){
    this.modalNuevoProcesoService.mostrarModal(this.usuarioService.usuario.id);
  }

  cambiarDesde(valor:number){
    let desde = this.desde + valor;

    if(desde >= this.totalRegistros){
      swal({
        position: 'top-end',
        type: 'warning',
        title: 'No hay mas registros',
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }

    if(desde < 0){
      swal({
        position: 'top-end',
        type: 'warning',
        title: 'No hay mas registros',
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  bsucarUsuario(termino:string){
    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this.usuarioService.buscarUsuario(termino).subscribe((usuarios:Usuario[])=>{
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  guardarUsuario(usuario:Usuario){
    this.usuarioService.actualizarUsuario(usuario, this.usuarioService.token).subscribe();
  }

  mostrarModal(id:string){
    this.modalUploadService.mostrarModal(id);   
  }

  borrarUsuario(usuario:Usuario){
    if(usuario.id === this.usuarioService.usuario.id){
      swal({
        position: 'top-end',
        type: 'error',
        title: 'Estas logueado con el usuario que intentas Eliminar',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    swal({
      title: 'Eliminar',
      text: "¿Seguro que deseas eliminar el usuario:"+usuario.nombre+" ?",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.borrarUsuario(usuario.id).subscribe((resp:any)=>{
          if(!resp.error){
            swal({
              type: 'success',
              title: 'Correcto',
              text: 'Usuario Borrado'
            });
            this.cargarUsuarios();
          }
        }, error =>{
          swal({
            type: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error, por favor intentalo nuevamente!'
          });
          this.cargarUsuarios();
          return;     
        });                
      }
    });
  }



}
