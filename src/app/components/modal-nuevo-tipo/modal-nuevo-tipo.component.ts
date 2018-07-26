import { Component, OnInit } from '@angular/core';
import { ModalNuevoTipoService } from './modal-nuevo-tipo.service';

@Component({
  selector: 'app-modal-nuevo-tipo',
  templateUrl: './modal-nuevo-tipo.component.html',
  styles: []
})
export class ModalNuevoTipoComponent implements OnInit {

  constructor(public modalNuevoTipoService: ModalNuevoTipoService) { }

  ngOnInit() {
  }

  cerrarModal(){
    
    this.modalNuevoTipoService.ocultarModal();
  }

}
