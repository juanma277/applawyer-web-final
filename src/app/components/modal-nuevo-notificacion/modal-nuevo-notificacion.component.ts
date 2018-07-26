import { Component, OnInit } from '@angular/core';
import { ModalNuevoNotificacionService } from './modal-nuevo-notificacion.service';

@Component({
  selector: 'app-modal-nuevo-notificacion',
  templateUrl: './modal-nuevo-notificacion.component.html',
  styles: []
})
export class ModalNuevoNotificacionComponent implements OnInit {

  constructor(public modalNuevoNotificacionService: ModalNuevoNotificacionService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalNuevoNotificacionService.ocultarModal();
  }

}
