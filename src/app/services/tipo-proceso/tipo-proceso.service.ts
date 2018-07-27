import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from "rxjs/operators";
import { Tipo } from '../../models/tipo.model';


@Injectable({
  providedIn: 'root'
})
export class TipoProcesoService {

  constructor(public http: HttpClient) { }

  cargarTiposActivos(){
    let url = URL_SERVICIOS + '/typeProcesses/activos/';
    return this.http.get(url);
  }

  cargarTipos(desde: number = 0){
    let url = URL_SERVICIOS + '/typeProcesses/paginate/'+desde;
    return this.http.get(url);  
  }

  crearTipo(tipo: Tipo ){
    const url = URL_SERVICIOS + '/typeProcesses/create';
    return this.http.post(url, { 'nombre':tipo.nombre, 'abreviatura':tipo.abreviatura, 'estado': tipo.estado })
              .pipe(map((resp:any)=>{
                return resp;
              }));
               
  }

  buscarTipo(termino:string){
    let url = URL_SERVICIOS + '/typeProcesses/searchType/'+termino;
    return this.http.get(url).pipe(map((resp:any)=>{
      return resp.types;      
    }));
  }

  actualizarTipo(tipo:Tipo, token:string){
    const url = URL_SERVICIOS + '/typeProcesses/update/'+tipo.id;
    return this.http.put(url, { 'nombre':tipo.nombre, 'abreviatura':tipo.abreviatura,  'estado':tipo.estado, 'token': token })
                    .pipe(map((resp:any)=>{
                      if(resp.error){
                        swal("Error!", "Faltan datos requeridos o se encuentran duplicados", "error");
                        return false;                  
                      }
                        swal("Correcto!", "Tipo de Proceso Actualizado", "success");
                        return true;
                  
                    }, error =>{
                      swal("Error!", "Ha ocurrido un error, por favor intentalo nuevamente!", "error");
                      return;                              
                    }));
  }

  borrarTipo(tipo_id:string){
    let url = URL_SERVICIOS + '/typeProcesses/delete/'+tipo_id;
    return this.http.delete(url);

  }
}
