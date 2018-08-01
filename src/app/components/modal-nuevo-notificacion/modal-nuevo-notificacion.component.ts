import { Component, OnInit } from '@angular/core';
import { ModalNuevoNotificacionService } from './modal-nuevo-notificacion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/service.index';
import { Notificacion } from '../../models/notificacion.model';
import { NotificacionService } from '../../services/notificacion/notificacion.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-modal-nuevo-notificacion',
  templateUrl: './modal-nuevo-notificacion.component.html',
  styles: []
})
export class ModalNuevoNotificacionComponent implements OnInit {

  forma1: FormGroup;
  forma2: FormGroup;
  forma3: FormGroup;

  formulario:string = '';
  usuarios: Usuario[] = [];
  showDropDown:boolean = false;

  constructor(public modalNuevoNotificacionService: ModalNuevoNotificacionService, public usuarioService: UsuarioService, public notificacionService:NotificacionService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.forma1 = new FormGroup({
      tipo: new FormControl(null, Validators.required),
    });

    this.forma2 = new FormGroup({
      usuario: new FormControl(null, Validators.required),
      titulo: new FormControl(null, Validators.required),
      mensaje: new FormControl(null, Validators.required),
      id:  new FormControl(null, Validators.required)
    });

    this.forma3 = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      mensaje: new FormControl(null, Validators.required)
    });
  }

  cerrarModal(){
    this.modalNuevoNotificacionService.ocultarModal();
    this.forma2.setValue({
      usuario: null,
      titulo: null,
      mensaje: null,
      id: null
    });

    this.forma3.setValue({
      titulo: null,
      mensaje: null
    });
  }

  cambiarFormulario(tipo:string){
    this.formulario = tipo;
  }

  buscarUsuarios(termino:string){

    termino = termino.trim();

    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }

    this.usuarioService.buscarUsuario(termino).subscribe((usuarios:Usuario[])=>{
      this.usuarios = usuarios;
      if(!this.usuarios){
        this.forma2.setValue({
          usuario: '',
          titulo: this.forma2.value.titulo,
          mensaje: this.forma2.value.mensaje,
          id: null
        });
      }

    });
  }

  seleccionUsuario(usuario:Usuario){
    this.showDropDown = false;
    this.forma2.setValue({
      usuario: usuario.nombre + ' ' + usuario.email,
      titulo: this.forma2.value.titulo,
      mensaje: this.forma2.value.mensaje,
      id: usuario.id
    });
  }


  registrarNotificacion(){
      if(this.forma2.invalid){
        return;
      }
  
      const notificacion = new Notificacion(
        this.forma2.value.id,
        this.forma2.value.titulo,
        this.forma2.value.mensaje,
        'INDIVIDUAL',
        'ACTIVO'
       );
  
      this.notificacionService.crearNotificacion(notificacion)
          .subscribe((resp:any)=>{
            if(resp.error){
              swal('Error', 'La información ingresada ya existe.', 'error');
              this.modalNuevoNotificacionService.notificacion.emit(resp);
              return;
            }
            swal('Correcto', 'Notificación Creada y Enviada.', 'success');
            this.modalNuevoNotificacionService.notificacion.emit(resp);
            this.cerrarModal();
          }, error=>{
              swal('Error', 'Ha ocurrido un error, por favor intentalo nuevamente!', 'error');
              this.modalNuevoNotificacionService.notificacion.emit(error);
              return;         
          });
  }

  registrarMasivo(){
    if(this.forma3.invalid){
      return;
    }

    const notificacion = new Notificacion(
      this.usuarioService.usuario.id,
      this.forma3.value.titulo,
      this.forma3.value.mensaje,
      'MASIVO',
      'ACTIVO'
     );

    this.notificacionService.crearNotificacion(notificacion)
        .subscribe((resp:any)=>{
          if(resp.error){
            swal('Error', 'La información ingresada ya existe.', 'error');
            this.modalNuevoNotificacionService.notificacion.emit(resp);
            return;
          }
          swal('Correcto', 'Notificación Creada y Enviada.', 'success');
          this.modalNuevoNotificacionService.notificacion.emit(resp);
          this.cerrarModal();
        }, error=>{
            swal('Error', 'Ha ocurrido un error, por favor intentalo nuevamente!', 'error');
            this.modalNuevoNotificacionService.notificacion.emit(error);
            return;         
        });
  }

  toogleDropDown(){
    this.showDropDown = !this.showDropDown;
  }

  cargarUsuarios(){
    this.usuarioService.cargarAllUsuarios().subscribe((resp:any)=>{
      this.usuarios = resp.usuarios;
    });
  }


}
