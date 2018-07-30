import { Component, OnInit } from '@angular/core';
import { CiudadService, UsuarioService } from '../../services/service.index';
import { Ciudad } from '../../models/ciudad.model';
import { ModalNuevoCiudadService } from '../../components/modal-nuevo-ciudad/modal-nuevo-ciudad.service';
import { URL_SERVICIOS } from '../../config/config';

import swal from 'sweetalert2';


@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styles: []
})
export class CiudadesComponent implements OnInit {

  ciudades:Ciudad[] = [];
  desde:number = 0;
  totalRegistros:number = 0;
  cargando:boolean = true;
  URL_DOWNLOAD_EXCEL:string;
  URL_DOWNLOAD_PDF:string;

  constructor(public ciudadService:CiudadService, public modalNuevoCiudadService:ModalNuevoCiudadService, public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarCiudades();
    this.URL_DOWNLOAD_PDF = URL_SERVICIOS+'/download/PDF/ciudades';
    this.URL_DOWNLOAD_EXCEL = URL_SERVICIOS+'/download/XLS/ciudades';

    this.modalNuevoCiudadService.notificacion.subscribe(resp =>{
      this.cargarCiudades();
    });
  }

  cargarCiudades(){
    this.cargando = true;
    this.ciudadService.cargarCiudades(this.desde).subscribe((resp:any)=>{
      this.totalRegistros = resp.total;
      this.ciudades = resp.cities;
      this.cargando = false;
    });
  }

  nuevaCiudad(){
    this.modalNuevoCiudadService.mostrarModal();
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
    this.cargarCiudades();
  }

  buscarCiudad(termino:string){
    
    termino = termino.trim();

    if(termino.length <= 0){
      this.cargarCiudades();
      return;
    }

    this.cargando = true;

    this.ciudadService.buscarCiudad(termino).subscribe((ciudades:Ciudad[])=>{
      this.ciudades = ciudades;
      this.cargando = false;
    });
  }

  guardarCiudad(ciudad:Ciudad){
    this.ciudadService.actualizarCiudad(ciudad, this.usuarioService.token).subscribe();
  }

  mostrarModal(id:string){
    this.modalNuevoCiudadService.mostrarModal();   
  }

  borrarCiudad(ciudad:Ciudad){

    swal({
      title: 'Eliminar',
      text: "¿Seguro que deseas eliminar la Ciudad:"+ciudad.nombre+" ?",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.ciudadService.borrarCiudad(ciudad.id).subscribe((resp:any)=>{
          if(!resp.error){
            swal({
              type: 'success',
              title: 'Correcto',
              text: 'Ciudad Borrada'
            });
            this.cargarCiudades();
          }
        }, error =>{
          swal({
            type: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error, por favor intentalo nuevamente!'
          });
          this.cargarCiudades();
          return;     
        });                
      }
    });
  }
}