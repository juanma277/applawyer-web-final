import { Component, OnInit } from '@angular/core';
import { ModalNuevoProcesoAdminService } from './modal-nuevo-proceso-admin.service';

@Component({
  selector: 'app-modal-nuevo-proceso-admin',
  templateUrl: './modal-nuevo-proceso-admin.component.html',
  styles: []
})
export class ModalNuevoProcesoAdminComponent implements OnInit {

  constructor(public modalNuevoProcesoAdminService: ModalNuevoProcesoAdminService) { }

  ngOnInit() {
  }

  cerrarModal(){
    
    this.modalNuevoProcesoAdminService.ocultarModal();
  }

}
