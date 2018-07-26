import { Component, OnInit } from '@angular/core';
import { ModalNuevoCiudadService } from './modal-nuevo-ciudad.service';

@Component({
  selector: 'app-modal-nuevo-ciudad',
  templateUrl: './modal-nuevo-ciudad.component.html',
  styles: []
})
export class ModalNuevoCiudadComponent implements OnInit {

  constructor(public modalNuevoCiudadService: ModalNuevoCiudadService) { }

  ngOnInit() {
  }

  cerrarModal(){
    
    this.modalNuevoCiudadService.ocultarModal();
  }

}
