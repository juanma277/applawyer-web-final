import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalNuevoProcesoService {
  
  public id: string;
  public oculto:string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() { }

  ocultarModal(){
    this.oculto = 'oculto';
    this.id= null;
  }

  mostrarModal(id:string){
    this.oculto = '';
    this.id = id;
  }
}
