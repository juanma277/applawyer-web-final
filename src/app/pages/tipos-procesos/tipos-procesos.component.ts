import { Component, OnInit } from '@angular/core';
import { Tipo } from '../../models/tipo.model';
import { TipoProcesoService, UsuarioService } from '../../services/service.index';
import { ModalNuevoTipoService } from '../../components/modal-nuevo-tipo/modal-nuevo-tipo.service';
import { URL_SERVICIOS } from '../../config/config';

import swal from 'sweetalert2';



@Component({
  selector: 'app-tipos-procesos',
  templateUrl: './tipos-procesos.component.html',
  styles: []
})
export class TiposProcesosComponent implements OnInit {

  tipos:Tipo[] = [];
  desde:number = 0;
  totalRegistros:number = 0;
  cargando:boolean = true;
  URL_DOWNLOAD_EXCEL:string;
  URL_DOWNLOAD_PDF:string;

  constructor(public tipoProcesoService:TipoProcesoService, public modalNuevoTipoService:ModalNuevoTipoService, public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarTipos();
    this.URL_DOWNLOAD_PDF = URL_SERVICIOS+'/download/PDF/tipos';
    this.URL_DOWNLOAD_EXCEL = URL_SERVICIOS+'/download/XLS/tipos';

    this.modalNuevoTipoService.notificacion.subscribe(resp =>{
      this.cargarTipos();
    });
  }

  cargarTipos(){
    this.cargando = true;
    this.tipoProcesoService.cargarTipos(this.desde).subscribe((resp:any)=>{
      this.totalRegistros = resp.cuenta;
      this.tipos = resp.types;
      this.cargando = false;
    });
  }

  nuevoTipo(){
    this.modalNuevoTipoService.mostrarModal();
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
    this.cargarTipos();
  }

  buscarTipo(termino:string){
    if(termino.length <= 0){
      this.cargarTipos();
      return;
    }

    this.cargando = true;

    this.tipoProcesoService.buscarTipo(termino).subscribe((tipos:Tipo[])=>{
      this.tipos = tipos;
      this.cargando = false;
    });
  }

  guardarTipo(tipo:Tipo){
    this.tipoProcesoService.actualizarTipo(tipo, this.usuarioService.token).subscribe();
  }

  mostrarModal(id:string){
    this.modalNuevoTipoService.mostrarModal();   
  }

  borrarTipo(tipo:Tipo){

    swal({
      title: 'Eliminar',
      text: "¿Seguro que deseas eliminar el Tipo de Proceso:"+tipo.nombre+" ?",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.tipoProcesoService.borrarTipo(tipo.id).subscribe((resp:any)=>{
          if(!resp.error){
            swal({
              type: 'success',
              title: 'Correcto',
              text: 'Tipo de Proceso Borrado'
            });
            this.cargarTipos();
          }
        }, error =>{
          swal({
            type: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error, por favor intentalo nuevamente!'
          });
          this.cargarTipos();
          return;     
        });                
      }
    });
  }
}
