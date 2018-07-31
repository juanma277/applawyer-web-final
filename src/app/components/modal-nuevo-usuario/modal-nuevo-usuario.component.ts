import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usario/usuario.service';
import { ModalNuevoUsuarioService } from './modal-nuevo-usuario.service';
import { ProcesoService, CiudadService, TipoProcesoService, JuzgadoService } from '../../services/service.index';
import { Proceso } from '../../models/proceso.model';

import swal from 'sweetalert2';


@Component({
  selector: 'app-modal-nuevo-usuario',
  templateUrl: './modal-nuevo-usuario.component.html',
  styles: []
})
export class ModalNuevoUsuarioComponent implements OnInit {

  forma: FormGroup;
  tipos = [];
  juzgados = [];
  ciudades = [];
  proceso: Proceso = {};


  constructor(public usuarioService: UsuarioService, public modalNuevoUsuarioService: ModalNuevoUsuarioService, public procesoService: ProcesoService, public tipoProcesoService: TipoProcesoService, public juzgadoService: JuzgadoService, public ciudadService: CiudadService) 
  {
    this.tipoProcesoService.cargarTiposActivos().subscribe((resp:any)=>{
      if(resp.error){
        swal({
          type: 'warning',
          title: 'Advertencia',
          text: 'No  existen tipos de procesos!',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        });

        return;
      }else{
        for(let i=0; i<resp.types.length ; i++){
          this.tipos.push(resp.types[i]);
        }
      }
     });

    this.ciudadService.cargarCiudadActivos().subscribe((resp:any)=>{
      if(resp.error){
        swal({
          type: 'warning',
          title: 'Advertencia',
          text: 'No  existen tipos de Ciudades!',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
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
    this.juzgados = [];
    this.juzgadoService.obtenerJuzgadoPorCiudad(id).subscribe((resp:any)=>{
      if(resp.error){
        swal({
          type: 'warning',
          title: 'Advertencia',
          text: 'No  existen Juzgados!',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        });        
        return;
      }else{
        for(let i=0; i<resp.courts.length ; i++){
          this.juzgados.push(resp.courts[i]);
        }
      }
    });
  }

  crearProceso(){

    if(this.forma.invalid){
      swal({
        type: 'error',
        title: 'Error',
        text: 'Existen campos obligatorios sin llenar!',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500
      }); 
      return;
    }

    this.proceso.user = this.usuarioService.usuario.id;
    this.proceso.juzgado = this.forma.value.juzgado;
    this.proceso.tipo = this.forma.value.tipo;
    this.proceso.demandante = this.forma.value.demandante;
    this.proceso.demandado = this.forma.value.demandado;
    this.proceso.radicado = this.forma.value.radicado;
    this.proceso.fecha = this.forma.value.fecha;   

    this.procesoService.crearProceso(this.proceso).subscribe((resp:any)=>{
      if(resp.error){
        swal({
          type: 'error',
          title: 'Error',
          text: 'Existe información duplicada o faltan datos!',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        });
        this.modalNuevoUsuarioService.notificacion.emit(resp);
        return;
      }else{
        swal({
          type: 'success',
          title: 'Correcto',
          text: 'Proceso Creado!'
        });
        this.proceso  = {};
        this.cerrarModal();
        this.modalNuevoUsuarioService.notificacion.emit(resp);        
        return;
      }
    }, error =>{
        swal({
          type: 'error',
          title: 'Error',
          text: 'Lo sentimos ha ocurrido un error, por favor intentalo nuevamente.'
        });
        this.modalNuevoUsuarioService.notificacion.emit(error);
        return;
    });
  }

  cerrarModal(){
    this.forma.setValue({
      ciudad: null,
      juzgado :null,
      tipo: null,
      demandante: null,
      demandado: null,
      radicado: null,
      fecha: null 
    });  
    
    this.modalNuevoUsuarioService.ocultarModal();
  }

  cambiarImagen(){
    this.usuarioService.actualizarImagen(this.forma.value.imagen, this.modalNuevoUsuarioService.id, this.usuarioService.token ).subscribe((resp:any)=>{
      this.modalNuevoUsuarioService.notificacion.emit(resp);
      this.cerrarModal();
    });
  }

}
