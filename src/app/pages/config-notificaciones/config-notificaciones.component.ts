import { Component, OnInit } from '@angular/core';
import { NotificacionService, UsuarioService } from '../../services/service.index';
import { Notificacion } from '../../models/notificacion.model';
import { ModalNuevoNotificacionService } from '../../components/modal-nuevo-notificacion/modal-nuevo-notificacion.service';
import { URL_SERVICIOS } from '../../config/config';

import swal from 'sweetalert2';

@Component({
  selector: 'app-config-notificaciones',
  templateUrl: './config-notificaciones.component.html',
  styles: []
})
export class ConfigNotificacionesComponent implements OnInit {

  notificaciones:Notificacion[] = [];
  desde:number = 0;
  totalRegistros:number = 0;
  cargando:boolean = true;
  URL_DOWNLOAD_EXCEL:string;
  URL_DOWNLOAD_PDF:string;

  constructor(public notificacionService:NotificacionService, public modalNuevoNotificacionService:ModalNuevoNotificacionService, public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarNotificaciones();
    this.URL_DOWNLOAD_PDF = URL_SERVICIOS+'/download/PDF/notificaciones';
    this.URL_DOWNLOAD_EXCEL = URL_SERVICIOS+'/download/XLS/notificaciones';

    this.modalNuevoNotificacionService.notificacion.subscribe(resp =>{
      this.cargarNotificaciones();
    });
  }

  cargarNotificaciones(){
    this.cargando = true;
    this.notificacionService.cargarNotificaciones(this.desde).subscribe((resp:any)=>{
      this.totalRegistros = resp.total;
      this.notificaciones = resp.notificaciones;
      this.cargando = false;
    });
  }

  nuevaNotificacion(id:string){
    this.modalNuevoNotificacionService.mostrarModal(id);
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
    this.cargarNotificaciones();
  }

  buscarNotificacion(termino:string){
    
    termino = termino.trim();

    if(termino.length <= 0){
      this.cargarNotificaciones();
      return;
    }

    this.cargando = true;

    this.notificacionService.buscarNotificacion(termino).subscribe((notificaciones:Notificacion[])=>{
      this.notificaciones = notificaciones;
      this.cargando = false;
    });
  }

  guardarNotificacion(notificacion:Notificacion){
    this.notificacionService.actualizarNotificacion(notificacion, this.usuarioService.token).subscribe();
  }

  mostrarModal(id:string){
    this.modalNuevoNotificacionService.mostrarModal(id);   
  }

  borrarNotificacion(notificacion:Notificacion){

    swal({
      title: 'Eliminar',
      text: "¿Seguro que deseas eliminar la Notificación:"+notificacion.titulo+" ?",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.notificacionService.borrarNotificacion(notificacion.id).subscribe((resp:any)=>{
          if(!resp.error){
            swal({
              type: 'success',
              title: 'Correcto',
              text: 'Notificación Borrada'
            });
            this.cargarNotificaciones();
          }
        }, error =>{
          swal({
            type: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error, por favor intentalo nuevamente!'
          });
          this.cargarNotificaciones();
          return;     
        });                
      }
    });
  }
}