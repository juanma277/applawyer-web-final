import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalNuevoCiudadService } from './modal-nuevo-ciudad.service';
import { CiudadService } from '../../services/service.index';
import { Ciudad } from '../../models/ciudad.model';


@Component({
  selector: 'app-modal-nuevo-ciudad',
  templateUrl: './modal-nuevo-ciudad.component.html',
  styles: []
})
export class ModalNuevoCiudadComponent implements OnInit {

  forma: FormGroup;

  constructor(public modalNuevoCiudadService: ModalNuevoCiudadService, public ciudadService:CiudadService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required)
    });
  }

  registrarCiudad(){
    if(this.forma.invalid){
      return;
    }

    const ciudad = new Ciudad(
      this.forma.value.nombre,
      this.forma.value.estado
     );

    this.ciudadService.crearCiudad(ciudad)
        .subscribe((resp:any)=>{
          if(resp.error){
            swal('Error', 'La información ingresada ya existe.', 'error');
            this.modalNuevoCiudadService.notificacion.emit(resp);
            return;
          }
          swal('Correcto', 'Ciudad Creada.', 'success');
          this.modalNuevoCiudadService.notificacion.emit(resp);
          this.cerrarModal();
        }, error=>{
            swal('Error', 'Ha ocurrido un error, por favor intentalo nuevamente!', 'error');
            this.modalNuevoCiudadService.notificacion.emit(error);
            return;         
        });
  }

  cerrarModal(){
    this.forma.setValue({
      nombre: null,
      estado: null,
    }); 
    this.modalNuevoCiudadService.ocultarModal();
  }
}
