import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class JuzgadoService {

  constructor(public http: HttpClient) { }

  cargarJuzgadoActivos(){
    let url = URL_SERVICIOS + '/court/activos/';
    return this.http.get(url);
  }

  obtenerJuzgadoPorCiudad(ciudad_id:string){
    let url = URL_SERVICIOS + '/court/cities/'+ciudad_id;
    return this.http.get(url);    
  }
}
