import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalNuevoCiudadService {

  public id: string;
  public oculto:string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() { }

  ocultarModal(){
    this.oculto = 'oculto';
    this.id= null;
  }

  mostrarModal(){
    this.oculto = '';
  }
}
