import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ModalNuevoTipoService } from './modal-nuevo-tipo.service';
import { TipoProcesoService } from '../../services/tipo-proceso/tipo-proceso.service';
import { Tipo } from '../../models/tipo.model';

@Component({
  selector: 'app-modal-nuevo-tipo',
  templateUrl: './modal-nuevo-tipo.component.html',
  styles: []
})
export class ModalNuevoTipoComponent implements OnInit {

  forma: FormGroup;

  constructor(public modalNuevoTipoService: ModalNuevoTipoService, public tipoProcesoService:TipoProcesoService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      abreviatura : new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required),
    });
  }

  registrarTipo(){
    if(this.forma.invalid){
      return;
    }

    const tipo = new Tipo(
      this.forma.value.nombre,
      this.forma.value.abreviatura,
      this.forma.value.estado
     );

    this.tipoProcesoService.crearTipo(tipo)
        .subscribe((resp:any)=>{
          if(resp.error){
            swal('Error', 'La información ingresada ya existe.', 'error');
            this.modalNuevoTipoService.notificacion.emit(resp);
            return;
          }
          swal('Correcto', 'Tipo de Proceso Creado.', 'success');
          this.modalNuevoTipoService.notificacion.emit(resp);
          this.cerrarModal();
        }, error=>{
            swal('Error', 'Ha ocurrido un error, por favor intentalo nuevamente!', 'error');
            this.modalNuevoTipoService.notificacion.emit(error);
            return;         
        });
  }

  cerrarModal(){
    this.forma.setValue({
      nombre: null,
      abreviatura : null,
      estado: null,
    }); 
    this.modalNuevoTipoService.ocultarModal();
  }

}
