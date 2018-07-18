import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProcesoService, UsuarioService, TipoProcesoService, JuzgadoService, CiudadService } from '../../services/service.index';
import { Proceso } from '../../models/proceso.model';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;


@Component({
  selector: 'app-mis-procesos',
  templateUrl: './mis-procesos.component.html'
})
export class MisProcesosComponent implements OnInit {

  nuevo:boolean = false;
  loadingJuzgado:boolean = false;
  contenido: string ="";
  forma: FormGroup;
  tipos = [];
  juzgados = [];
  ciudades = [];
  proceso: Proceso = {};
  loader: boolean = false;


  constructor(public procesoService: ProcesoService, public usuarioService: UsuarioService, public tipoProcesoService: TipoProcesoService, public juzgadoService: JuzgadoService, public ciudadService: CiudadService) 
   {
     this.tipoProcesoService.cargarTiposActivos().subscribe((resp:any)=>{
      if(resp.error){
        swal("Advertencia", "No  existen tipos de procesos!", "warning");
        return;
      }else{
        for(let i=0; i<resp.types.length ; i++){
          this.tipos.push(resp.types[i]);
        }
      }
     });

    this.ciudadService.cargarCiudadActivos().subscribe((resp:any)=>{
      if(resp.error){
        swal("Advertencia", "No  existen Ciudades!", "warning");
        return;
      }else{
        for(let i=0; i<resp.cities.length ; i++){
          this.ciudades.push(resp.cities[i]);
        }
      }
    });
   }

  ngOnInit() {
    this.procesoService.cargarProcesos(this.usuarioService.usuario.id).subscribe((resp:any)=>{

    });
    this.forma = new FormGroup({
      ciudad: new FormControl('', Validators.required),
      juzgado : new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
      demandante: new FormControl(null, Validators.required),
      demandado: new FormControl(null,  Validators.required),
      radicado: new FormControl(null,  Validators.required),
      fecha: new FormControl(null, Validators.required)
    });
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
        swal("Advertencia", "No  existen Juzgados!", "warning");
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
    this.contenido = "loading";
  }

  cerrarModal(){
    this.nuevo = false;
    this.contenido = "";

  }

  eliminar(proceso_id:string){
    console.log(proceso_id);
  }

  crearProceso(){
    this.loader = true;

    if(this.forma.invalid){
      swal("Error", "Existen campos obligatorios sin llenar!", "warning");
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
        swal("Error", "Existe información duplicada o faltan datos!", "warning");
        this.loader = false;
        return;
      }else{
        swal("Correcto", "Proceso creado!", "success");
        this.loader = false;
        this.nuevo = false;
        this.contenido = "";
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
        swal("Error", "Lo sentimos ha ocurrido un error, por favor intentalo nuevamente."+JSON.stringify(error), "warning");
        this.loader = false;        
        return;
    });


  }

}
