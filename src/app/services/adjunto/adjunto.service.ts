import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Adjunto } from '../../models/adjunto.model';
import { map } from 'rxjs/operators';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class AdjuntoService {

  adjuntos = [];

  constructor(public http: HttpClient) { }

  crearAdjunto(adjunto: Adjunto){
    let url = URL_SERVICIOS + '/adjuntos/create/web';
    return this.http.post(url, {'proceso_id': adjunto.proceso_id, 'descripcion': adjunto.descripcion, 'archivo': adjunto.archivo})
                .pipe(map((resp:any)=>{
                  this.adjuntos.push(resp.adjunto);
                  return resp;
                }));
  }

  cargarAdjuntosPorProceso(proceso_id:string){
    this.adjuntos = [];
    let url = URL_SERVICIOS + '/adjuntos/allAdjuntos/'+proceso_id;
    return this.http.get(url).pipe(map((resp:any)=>{
      if(resp.error){
        return resp;
      }else{
        for(let i=0; i<resp.adjuntos.length ; i++){
          this.adjuntos.push(resp.adjuntos[i]);
        }
        return resp;
      }
    }, error =>{
      swal("Advertencia", "Ha ocurrido un error por favor intentalo nuevamente!", "warning");
    }));
  }

  cargarDatosAdjunto(adjunto_id:string){
    let url = URL_SERVICIOS + '/adjuntos/getAdjunto/'+adjunto_id;
    return this.http.get(url).pipe(map((resp:any)=>{
      return resp;      
    }));
  }

  actualizarAdjunto(adjunto: Adjunto){
    this.adjuntos =[];
    let url = URL_SERVICIOS + '/adjuntos/update/web/'+adjunto.id;
    return this.http.put(url, {'proceso_id': adjunto.proceso_id, 'descripcion': adjunto.descripcion, 'archivo': adjunto.archivo})
                .pipe(map((resp:any)=>{
                  for(let i=0; i<resp.adjuntos.length ; i++){
                    this.adjuntos.push(resp.adjuntos[i]);
                  }
                  return resp;
                }));
  }

  eliminarAdjunto(adjunto_id:string, proceso_id:string){
    this.adjuntos = [];
    let url = URL_SERVICIOS + '/adjuntos/delete/'+adjunto_id+'/'+proceso_id;

    return this.http.delete(url).pipe(map((resp:any)=>{
      if(resp.error){
        return resp;
      }else{
        for(let i=0; i<resp.adjuntos.length ; i++){
          this.adjuntos.push(resp.adjuntos[i]);
        }
        return resp;
      }
    }, error =>{
      swal("Advertencia", "Ha ocurrido un error por favor intentalo nuevamente!", "warning");
    }));

  }
}
