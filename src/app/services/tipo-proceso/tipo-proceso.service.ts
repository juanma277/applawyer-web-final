import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';


@Injectable({
  providedIn: 'root'
})
export class TipoProcesoService {

  constructor(public http: HttpClient) { }

  cargarTiposActivos(){
    let url = URL_SERVICIOS + '/typeProcesses/activos/';
    return this.http.get(url);
  }
}
