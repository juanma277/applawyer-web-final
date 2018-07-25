import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProcesoService, UsuarioService, TipoProcesoService, JuzgadoService, CiudadService } from '../../services/service.index';
import { Proceso } from '../../models/proceso.model';

import swal from 'sweetalert2';
import { URL_SERVICIOS } from '../../config/config';


@Component({
  selector: 'app-mis-procesos',
  templateUrl: './mis-procesos.component.html'
})
export class MisProcesosComponent implements OnInit {

  nuevo:boolean = false;
  loadingJuzgado:boolean = false;
  forma: FormGroup;
  tipos = [];
  juzgados = [];
  ciudades = [];
  proceso: Proceso = {};
  cargando:boolean = true;
  URL_DOWNLOAD_EXCEL:string;
  URL_DOWNLOAD_PDF:string; 



  constructor(public procesoService: ProcesoService, public usuarioService: UsuarioService, public tipoProcesoService: TipoProcesoService, public juzgadoService: JuzgadoService, public ciudadService: CiudadService) 
   {
    this.cargando = true; 
    this.tipoProcesoService.cargarTiposActivos().subscribe((resp:any)=>{
      if(resp.error){
        swal({
          type: 'warning',
          title: 'Advertencia',
          text: 'No  existen tipos de procesos!'
        });
          this.cargando =false;

        return;
      }else{
        for(let i=0; i<resp.types.length ; i++){
          this.tipos.push(resp.types[i]);
        }
        this.cargando =false;
      }
     });

    this.ciudadService.cargarCiudadActivos().subscribe((resp:any)=>{
      if(resp.error){
        swal({
          type: 'warning',
          title: 'Advertencia',
          text: 'No  existen tipos de Ciudades!'
        });
        return;
      }else{
        for(let i=0; i<resp.cities.length ; i++){
          this.ciudades.push(resp.cities[i]);
        }
      }
    });
   }

  ngOnInit() {
    this.procesoService.cargarProcesos(this.usuarioService.usuario.id).subscribe();
    this.forma = new FormGroup({
      ciudad: new FormControl('', Validators.required),
      juzgado : new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
      demandante: new FormControl(null, Validators.required),
      demandado: new FormControl(null,  Validators.required),
      radicado: new FormControl(null,  Validators.required),
      fecha: new FormControl(null, Validators.required)
    });

    this.URL_DOWNLOAD_EXCEL = URL_SERVICIOS+"/download/XLS/procesos/"+this.usuarioService.usuario.id;
    this.URL_DOWNLOAD_PDF = URL_SERVICIOS+"/download/PDF/procesos/"+this.usuarioService.usuario.id;

  }

  obtenerJuzgado(id: string){
    if(id === ''){
      this.juzgados = [];
      return;
    }
    this.loadingJuzgado = true;
    this.juzgados = [];
    this.juzgadoService.obtenerJuzgadoPorCiudad(id).subscribe((resp:any)=>{
      if(resp.error){
        swal({
          type: 'warning',
          title: 'Advertencia',
          text: 'No  existen Juzgados!'
        });        
        this.loadingJuzgado = false;
        return;
      }else{
        for(let i=0; i<resp.courts.length ; i++){
          this.juzgados.push(resp.courts[i]);
        }
        this.loadingJuzgado = false;
      }
    });
  }

  nuevoProceso(){
    this.nuevo = true;
  }

  cerrarModal(){
    this.nuevo = false;

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
            this.procesoService.cargarProcesos(this.usuarioService.usuario.id).subscribe((resp:any)=>{
              this.cargando = false;
            });
        });
      }
    })         
  }

  crearProceso(){
    this.cargando = true;

    if(this.forma.invalid){
      swal({
        type: 'error',
        title: 'Error',
        text: 'Existen campos obligatorios sin llenar!'
      }); 
      return;
    }

    this.proceso.user_id = this.usuarioService.usuario.id;
    this.proceso.juzgado_id = this.forma.value.juzgado;
    this.proceso.tipo_proceso_id = this.forma.value.tipo;
    this.proceso.demandante = this.forma.value.demandante;
    this.proceso.demandado = this.forma.value.demandado;
    this.proceso.radicado = this.forma.value.radicado;
    this.proceso.fecha = this.forma.value.fecha;   

    this.procesoService.crearProceso(this.proceso).subscribe((resp:any)=>{
      if(resp.error){
        swal({
          type: 'error',
          title: 'Error',
          text: 'Existe información duplicada o faltan datos!'
        });
        this.cargando = false;
        return;
      }else{
        swal({
          type: 'success',
          title: 'Correcto',
          text: 'Proceso Creado!'
        });
        this.cargando = false;
        this.nuevo = false;
        this.proceso  = {};
        this.forma.setValue({
          ciudad: '',
          juzgado : '',
          tipo: '',
          demandante: '',
          demandado: '',
          radicado: '',
          fecha: ''         
        });
        this.procesoService.cargarProcesos(this.usuarioService.usuario.id).subscribe();
        return;
      }
    }, error =>{
        swal({
          type: 'error',
          title: 'Error',
          text: 'Lo sentimos ha ocurrido un error, por favor intentalo nuevamente.'
        });
        this.cargando = false;        
        return;
    });
  }
}
