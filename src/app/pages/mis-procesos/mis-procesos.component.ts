import { Component, OnInit } from '@angular/core';
import { ProcesoService, UsuarioService } from '../../services/service.index';
import { Proceso } from '../../models/proceso.model';
import { URL_SERVICIOS } from '../../config/config';
import { ModalNuevoUsuarioService } from '../../components/modal-nuevo-usuario/modal-nuevo-usuario.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-mis-procesos',
  templateUrl: './mis-procesos.component.html'
})
export class MisProcesosComponent implements OnInit {

  procesos:Proceso[] = [];
  desde:number = 0;
  totalRegistros:number = 0;
  cargando:boolean = true;

  URL_DOWNLOAD_EXCEL:string;
  URL_DOWNLOAD_PDF:string; 


  constructor(public procesoService: ProcesoService, public usuarioService: UsuarioService, public modalNuevoUsuarioService: ModalNuevoUsuarioService) 
   { }

  ngOnInit() {
    this.cargarProcesos();
    this.URL_DOWNLOAD_EXCEL = URL_SERVICIOS+"/download/XLS/procesos/"+this.usuarioService.usuario.id;
    this.URL_DOWNLOAD_PDF = URL_SERVICIOS+"/download/PDF/procesos/"+this.usuarioService.usuario.id;
  }

  cargarProcesos(){
    this.cargando = true;
    this.procesoService.cargarProcesosPaginados(this.usuarioService.usuario.id, this.desde).subscribe((resp:any)=>{
      this.totalRegistros = resp.cuenta;
      this.procesos = resp.process;
      this.cargando = false;
    });
  }

  nuevoProceso(){
    this.modalNuevoUsuarioService.mostrarModal(this.usuarioService.usuario.id);
  }


  eliminar(proceso_id:string){
    swal({
      title: 'Eliminar Proceso',
      text: "¿Seguro que deseas eliminar el Proceso?",
      type: 'error',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.cargando = true;
        this.procesoService.eliminarProceso(proceso_id, this.usuarioService.usuario.id).subscribe((resp:any)=>{
            this.cargarProcesos();
        });
      }
    })         
  }

  buscarProceso(termino:string){
    termino = termino.trim();

    if(termino.length <= 0){
      this.cargarProcesos();    
      return;
    }

    this.cargando = true;
    this.procesoService.buscarProcesos(termino, this.usuarioService.usuario.id).subscribe((resp:any)=>{
      this.cargando = false;
      this.procesos = resp.procesos;
    }, error =>{
      swal({
        type: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error, por favor intentalo nuevamente!'
      });
    });
    
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
    this.cargarProcesos();
  }

}
