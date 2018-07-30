import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from "rxjs/operators";
import { Ciudad } from '../../models/ciudad.model';


@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(public http: HttpClient) { }

  cargarCiudadActivos(){
    let url = URL_SERVICIOS + '/cities/activos';
    return this.http.get(url);
  }

  cargarCiudades(desde: number = 0){
    let url = URL_SERVICIOS + '/cities/paginate/'+desde;
    return this.http.get(url);  
  }

  crearCiudad(ciudad: Ciudad ){
    const url = URL_SERVICIOS + '/cities/create';
    return this.http.post(url, { 'nombre':ciudad.nombre, 'estado': ciudad.estado })
              .pipe(map((resp:any)=>{
                return resp;
              }));
               
  }

  buscarCiudad(termino:string){
    let url = URL_SERVICIOS + '/cities/searchCity/'+termino;
    return this.http.get(url).pipe(map((resp:any)=>{
      return resp.cities;      
    }));
  }

  actualizarCiudad(ciudad:Ciudad, token:string){
    const url = URL_SERVICIOS + '/cities/update/'+ciudad.id;
    return this.http.put(url, { 'nombre':ciudad.nombre, 'estado':ciudad.estado, 'token': token })
                    .pipe(map((resp:any)=>{
                      if(resp.error){
                        swal("Error!", "Faltan datos requeridos o se encuentran duplicados", "error");
                        return false;                  
                      }
                        swal("Correcto!", "Ciudad Actualizada", "success");
                        return true;
                  
                    }, error =>{
                      swal("Error!", "Ha ocurrido un error, por favor intentalo nuevamente!", "error");
                      return;                              
                    }));
  }

  borrarCiudad(ciudad_id:string){
    let url = URL_SERVICIOS + '/cities/delete/'+ciudad_id;
    return this.http.delete(url);

  }
}
