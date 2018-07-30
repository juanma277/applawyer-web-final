import { Component, OnInit } from '@angular/core';
import { JuzgadoService, UsuarioService, CiudadService } from '../../services/service.index';
import { Juzgado } from '../../models/juzgado.model';
import { Ciudad } from '../../models/ciudad.model';
import { URL_SERVICIOS } from '../../config/config';
import { ModalNuevoJuzgadoService } from '../../components/modal-nuevo-juzgado/modal-nuevo-juzgado.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-juzgados',
  templateUrl: './juzgados.component.html',
  styles: []
})
export class JuzgadosComponent implements OnInit {

  juzgados:Juzgado[] = [];
  ciudades:Ciudad[] = [];
  desde:number = 0;
  totalRegistros:number = 0;
  cargando:boolean = true;
  URL_DOWNLOAD_EXCEL:string;
  URL_DOWNLOAD_PDF:string;

  constructor(public juzgadoService:JuzgadoService, public modalNuevoJuzgadoService:ModalNuevoJuzgadoService, public ciudadService: CiudadService, public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarJuzgados();
    this.URL_DOWNLOAD_PDF = URL_SERVICIOS+'/download/PDF/juzgados';
    this.URL_DOWNLOAD_EXCEL = URL_SERVICIOS+'/download/XLS/juzgados';

    this.modalNuevoJuzgadoService.notificacion.subscribe(resp =>{
      this.cargarJuzgados();
    });

    this.ciudadService.cargarCiudades().subscribe((resp:any)=>{
      this.ciudades = resp.cities;
    });
  }

  cargarJuzgados(){
    this.cargando = true;
    this.juzgadoService.cargarJuzgados(this.desde).subscribe((resp:any)=>{
      this.totalRegistros = resp.total;
      this.juzgados = resp.courts;
      this.cargando = false;
    });
  }

  nuevoJuzgado(){
    this.modalNuevoJuzgadoService.mostrarModal();
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
    this.cargarJuzgados();
  }

  buscarJuzgado(termino:string){
    termino = termino.trim();

    if(termino.length <= 0){
      this.cargarJuzgados();
      return;
    }

    this.cargando = true;

    this.juzgadoService.buscarJuzgado(termino).subscribe((juzgados:Juzgado[])=>{
      this.juzgados = juzgados;
      this.cargando = false;
    });
  }

  guardarJuzgado(juzgado:Juzgado){
    this.juzgadoService.actualizarJuzgado(juzgado, this.usuarioService.token).subscribe();
  }

  mostrarModal(id:string){
    this.modalNuevoJuzgadoService.mostrarModal();   
  }

  borrarJuzgado(juzgado:Juzgado){

    swal({
      title: 'Eliminar',
      text: "¿Seguro que deseas eliminar el Juzgado:"+juzgado.nombre+" ?",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.juzgadoService.borrarJuzgado(juzgado.id).subscribe((resp:any)=>{
          if(!resp.error){
            swal({
              type: 'success',
              title: 'Correcto',
              text: 'Juzgado Borrado'
            });
            this.cargarJuzgados();
          }
        }, error =>{
          swal({
            type: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error, por favor intentalo nuevamente!'
          });
          this.cargarJuzgados();
          return;     
        });                
      }
    });
  }
}
