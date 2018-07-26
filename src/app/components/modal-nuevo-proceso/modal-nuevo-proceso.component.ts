import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/service.index';
import { ModalNuevoProcesoService } from './modal-nuevo-proceso.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-modal-nuevo-proceso',
  templateUrl: './modal-nuevo-proceso.component.html',
  styles: []
})
export class ModalNuevoProcesoComponent implements OnInit {

  forma: FormGroup;

  constructor(public modalNuevoProcesoService: ModalNuevoProcesoService, public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email : new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      notificaciones: new FormControl(false,  Validators.required),
      condiciones: new FormControl(true),
    }, { validators: this.validarIguales('password', 'password2')});
  }

  validarIguales(campo1: string, campo2: string){

    return (group: FormGroup) =>{
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if( pass1 === pass2 ){
        return null;
      }

        return {
          sonIguales: true
        };
    };
  }

  registrarUsuario(){
    if(this.forma.invalid){
      return;
    }

    if(!this.forma.value.condiciones){
      swal("Importante!", "Debes aceptar las condiciones!", "warning");
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      this.forma.value.notificaciones,
      this.forma.value.condiciones
     );

    this.usuarioService.crearUsuario(usuario)
        .subscribe((resp:any)=>{
          if(resp.error){
            swal('Error', 'La información ingresada ya existe.', 'error');
            this.modalNuevoProcesoService.notificacion.emit(resp);
            return;
          }
          swal('Correcto', 'Usuario Creado.', 'success');
          this.modalNuevoProcesoService.notificacion.emit(resp);
          this.cerrarModal();
        }, error=>{
            swal('Error', 'Ha ocurrido un error, por favor intentalo nuevamente!', 'error');
            this.modalNuevoProcesoService.notificacion.emit(error);
            return;         
        });
  }

  cerrarModal(){
    this.forma.setValue({
      nombre: null,
      email : null,
      password: null,
      password2: null,
      notificaciones: null,
      condiciones: null      
    });    
    this.modalNuevoProcesoService.ocultarModal();
  }

}
