import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalNuevoJuzgadoService } from './modal-nuevo-juzgado.service';
import { JuzgadoService, CiudadService } from 'src/app/services/service.index';
import { Juzgado } from '../../models/juzgado.model';
import { Ciudad } from '../../models/ciudad.model';

@Component({
  selector: 'app-modal-nuevo-juzgado',
  templateUrl: './modal-nuevo-juzgado.component.html',
  styles: []
})
export class ModalNuevoJuzgadoComponent implements OnInit {

  forma: FormGroup;
  ciudades:Ciudad[] = [];

  constructor(public modalNuevoJuzgadoService: ModalNuevoJuzgadoService, public juzgadoService:JuzgadoService,  public ciudadService: CiudadService ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      abreviatura: new FormControl(null, Validators.required),
      ciudad: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required)
    });

    this.ciudadService.cargarCiudades().subscribe((resp:any)=>{
      this.ciudades = resp.cities;
    });
  }

  registrarJuzgado(){
    if(this.forma.invalid){
      return;
    }

    const juzgado = new Juzgado(
      this.forma.value.nombre,
      this.forma.value.abreviatura,
      this.forma.value.ciudad,
      this.forma.value.estado
     );

    this.juzgadoService.crearJuzgado(juzgado)
        .subscribe((resp:any)=>{
          if(resp.error){
            swal('Error', 'La información ingresada ya existe.', 'error');
            this.modalNuevoJuzgadoService.notificacion.emit(resp);
            return;
          }
          swal('Correcto', 'Juzgado Creado.', 'success');
          this.modalNuevoJuzgadoService.notificacion.emit(resp);
          this.cerrarModal();
        }, error=>{
            swal('Error', 'Ha ocurrido un error, por favor intentalo nuevamente!', 'error');
            this.modalNuevoJuzgadoService.notificacion.emit(error);
            return;         
        });
  }

  cerrarModal(){
    this.forma.setValue({
      nombre: null,
      abreviatura: null,
      ciudad: null,
      estado: null,
    }); 
    this.modalNuevoJuzgadoService.ocultarModal();
  }

}
