import { Component, OnInit } from '@angular/core';
import { ModalNuevoJuzgadoService } from './modal-nuevo-juzgado.service';

@Component({
  selector: 'app-modal-nuevo-juzgado',
  templateUrl: './modal-nuevo-juzgado.component.html',
  styles: []
})
export class ModalNuevoJuzgadoComponent implements OnInit {

  constructor(public modalNuevoJuzgadoService: ModalNuevoJuzgadoService) { }

  ngOnInit() {
  }

  cerrarModal(){
    
    this.modalNuevoJuzgadoService.ocultarModal();
  }

}
