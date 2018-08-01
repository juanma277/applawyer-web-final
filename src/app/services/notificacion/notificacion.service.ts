import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from "rxjs/operators";
import { Notificacion } from '../../models/notificacion.model';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(public http: HttpClient) { }

  cargarNotificacionesActivos(){
    let url = URL_SERVICIOS + '/notifications/activos';
    return this.http.get(url);
  }

  cargarNotificaciones(desde: number = 0){
    let url = URL_SERVICIOS + '/notifications/paginate/'+desde;
    return this.http.get(url);  
  }

  crearNotificacion(notificacion: Notificacion){
    const url = URL_SERVICIOS + '/notifications/create';
    return this.http.post(url, { 'user':notificacion.user, 'titulo': notificacion.titulo, 'mensaje': notificacion.mensaje, 'tipo': notificacion.tipo, 'estado': notificacion.estado})
              .pipe(map((resp:any)=>{
                return resp;
              }));
               
  }

  buscarNotificacion(termino:string){
    let url = URL_SERVICIOS + '/notifications/searchNotificacion/'+termino;
    return this.http.get(url).pipe(map((resp:any)=>{
      return resp.notificaciones;      
    }));
  }

  actualizarNotificacion(notificacion: Notificacion, token:string){
    const url = URL_SERVICIOS + '/notifications/update/'+notificacion.id;
    return this.http.put(url, { 'user':notificacion.user, 'titulo': notificacion.titulo, 'mensaje': notificacion.mensaje, 'tipo': notificacion.tipo, 'estado': notificacion.estado, 'token': token })
                    .pipe(map((resp:any)=>{
                      if(resp.error){
                        swal("Error!", "Faltan datos requeridos o se encuentran duplicados", "error");
                        return false;                  
                      }
                        swal("Correcto!", "Notificación Actualizada", "success");
                        return true;
                  
                    }, error =>{
                      swal("Error!", "Ha ocurrido un error, por favor intentalo nuevamente!", "error");
                      return;                              
                    }));
  }

  borrarNotificacion(notificacion_id:string){
    let url = URL_SERVICIOS + '/notifications/delete/'+notificacion_id;
    return this.http.delete(url);

  }
}
