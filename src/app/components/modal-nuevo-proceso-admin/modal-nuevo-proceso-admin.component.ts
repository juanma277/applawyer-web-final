import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalNuevoProcesoAdminService } from './modal-nuevo-proceso-admin.service';
import { ProcesoService, UsuarioService, CiudadService, TipoProcesoService, JuzgadoService } from '../../services/service.index';
import { Proceso } from '../../models/proceso.model';

import swal from 'sweetalert2';

@Component({
  selector: 'app-modal-nuevo-proceso-admin',
  templateUrl: './modal-nuevo-proceso-admin.component.html',
  styles: []
})
export class ModalNuevoProcesoAdminComponent implements OnInit {

  forma: FormGroup;
  tipos = [];
  juzgados = [];
  ciudades = [];
  users = [];
  proceso: Proceso = {};

  constructor(public modalNuevoProcesoAdminService: ModalNuevoProcesoAdminService, public usuarioService: UsuarioService, public procesoService: ProcesoService, public tipoProcesoService: TipoProcesoService, public juzgadoService: JuzgadoService, public ciudadService: CiudadService ) 
  {

    this.usuarioService.cargarAllUsuarios().subscribe((resp:any)=>{
      if(resp.error){
        swal({
          type: 'warning',
          title: 'Advertencia',
          text: 'No  existen Usuarios!',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }else{
        for(let i=0; i<resp.usuarios.length ; i++){
          this.users.push(resp.usuarios[i]);
        }
      }
     });

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
          text: 'No existen Ciudades!',
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
      usuario: new FormControl('', Validators.required),
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

    this.proceso.user = this.forma.value.usuario;
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
          this.modalNuevoProcesoAdminService.notificacion.emit(resp);
          return;
      }else{
        swal({
          type: 'success',
          title: 'Correcto',
          text: 'Proceso Creado!'
        });
        this.modalNuevoProcesoAdminService.notificacion.emit(resp);
        this.cerrarModal();
        return;
      }
    }, error =>{
        swal({
          type: 'error',
          title: 'Error',
          text: 'Lo sentimos ha ocurrido un error, por favor intentalo nuevamente.'
        });
        this.modalNuevoProcesoAdminService.notificacion.emit(error);
        return;
    });
  }

  cerrarModal(){
    this.forma.setValue({
      ciudad: null,
      usuario: null,
      juzgado :null,
      tipo: null,
      demandante: null,
      demandado: null,
      radicado: null,
      fecha: null 
    });  
    
    this.modalNuevoProcesoAdminService.ocultarModal();
  }
}
