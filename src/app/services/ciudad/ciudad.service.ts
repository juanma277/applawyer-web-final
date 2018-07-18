import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';


@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(public http: HttpClient) { }

  cargarCiudadActivos(){
    let url = URL_SERVICIOS + '/cities/activos';
    return this.http.get(url);
  }
}
