import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from "rxjs/operators";
import { Juzgado } from '../../models/juzgado.model';


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

  cargarJuzgados(desde: number = 0){
    let url = URL_SERVICIOS + '/court/paginate/'+desde;
    return this.http.get(url);  
  }

  crearJuzgado(juzgado: Juzgado ){
    const url = URL_SERVICIOS + '/court/create';
    return this.http.post(url, { 'nombre':juzgado.nombre, 'abreviatura':juzgado.abreviatura, 'ciudad':juzgado.ciudad_id, 'estado': juzgado.estado })
              .pipe(map((resp:any)=>{
                return resp;
              }));
               
  }

  buscarJuzgado(termino:string){
    let url = URL_SERVICIOS + '/court/searchCourt/'+termino;
    return this.http.get(url).pipe(map((resp:any)=>{
      return resp.courts;      
    }));
  }

  actualizarJuzgado(juzgado:Juzgado, token:string){
    const url = URL_SERVICIOS + '/court/update/'+juzgado.id;
    return this.http.put(url, { 'nombre':juzgado.nombre, 'abreviatura':juzgado.abreviatura, 'ciudad':juzgado.ciudad_id, 'estado': juzgado.estado, 'token': token })
                    .pipe(map((resp:any)=>{
                      if(resp.error){
                        swal("Error!", "Faltan datos requeridos o se encuentran duplicados", "error");
                        return false;                  
                      }
                        swal("Correcto!", "Juzgado Actualizado", "success");
                        return true;
                  
                    }, error =>{
                      swal("Error!", "Ha ocurrido un error, por favor intentalo nuevamente!", "error");
                      return;                              
                    }));
  }

  borrarJuzgado(juzgado_id:string){
    let url = URL_SERVICIOS + '/court/delete/'+juzgado_id;
    return this.http.delete(url);

  }
}
