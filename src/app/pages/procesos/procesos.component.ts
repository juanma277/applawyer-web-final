import { Component, OnInit } from '@angular/core';
import { JuzgadoService, UsuarioService, CiudadService, TipoProcesoService, ProcesoService } from '../../services/service.index';
import { Juzgado } from '../../models/juzgado.model';
import { Ciudad } from '../../models/ciudad.model';
import { Tipo } from '../../models/tipo.model';
import { Proceso } from '../../models/proceso.model';
import { URL_SERVICIOS } from '../../config/config';
import { ModalNuevoProcesoAdminService } from '../../components/modal-nuevo-proceso-admin/modal-nuevo-proceso-admin.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styles: []
})
export class ProcesosComponent implements OnInit {

  procesos:Proceso[] = [];
  juzgados:Juzgado[] = [];
  ciudades:Ciudad[] = [];
  tipos:Tipo[] = [];
  desde:number = 0;
  totalRegistros:number = 0;
  cargando:boolean = true;
  URL_DOWNLOAD_EXCEL:string;
  URL_DOWNLOAD_PDF:string;

  constructor(public juzgadoService:JuzgadoService, public modalNuevoProcesoAdminService:ModalNuevoProcesoAdminService, public ciudadService: CiudadService, public usuarioService: UsuarioService, public tipoProcesoService:TipoProcesoService, public procesoService:ProcesoService) { }

  ngOnInit() {
    this.cargarProcesos();
    this.URL_DOWNLOAD_PDF = URL_SERVICIOS+'/download/PDF/Aprocesos';
    this.URL_DOWNLOAD_EXCEL = URL_SERVICIOS+'/download/XLS/Aprocesos';

    this.modalNuevoProcesoAdminService.notificacion.subscribe(resp =>{
      this.cargarProcesos();
    });

    this.ciudadService.cargarCiudades().subscribe((resp:any)=>{
      this.ciudades = resp.cities;
    });

    this.juzgadoService.cargarJuzgados().subscribe((resp:any)=>{
      this.juzgados = resp.courts;
    });

    this.tipoProcesoService.cargarTipos().subscribe((resp:any)=>{
      this.tipos = resp.types;
    });

    
  }

  cargarProcesos(){
    this.cargando = true;
    this.procesoService.cargarProcesosAdmin(this.desde).subscribe((resp:any)=>{
      this.totalRegistros = resp.total;
      this.procesos = resp.process;
      this.cargando = false;
    });
  }

  nuevoProceso(){
    this.modalNuevoProcesoAdminService.mostrarModal();
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

  buscarProceso(termino:string){

    termino = termino.trim();

    if(termino.length <= 0){
      this.cargarProcesos();
      return;
    }

    this.cargando = true;

    this.procesoService.buscarProceso(termino).subscribe((procesos:Proceso[])=>{
      this.procesos = procesos;
      this.cargando = false;
    });
  }

  guardarProceso(proceso:Proceso){
    this.procesoService.actualizarProceso(proceso, this.usuarioService.token).subscribe();
  }

  mostrarModal(){
    this.modalNuevoProcesoAdminService.mostrarModal();   
  }

  borrarProceso(proceso:Proceso){

    swal({
      title: 'Eliminar',
      text: "¿Seguro que deseas eliminar el Proceso:"+proceso.radicado+" ?",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.procesoService.borrarProceso(proceso.id).subscribe((resp:any)=>{
          if(!resp.error){
            swal({
              type: 'success',
              title: 'Correcto',
              text: 'Proceso Borrado'
            });
            this.cargarProcesos();
          }
        }, error =>{
          swal({
            type: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error, por favor intentalo nuevamente!'
          });
          this.cargarProcesos();
          return;     
        });                
      }
    });
  }
}

