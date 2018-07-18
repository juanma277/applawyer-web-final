import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Alerta } from '../../models/alerta.model';
import { map } from 'rxjs/operators';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  alertas = [];

  constructor(public http: HttpClient) { }

  crearAlerta(alerta: Alerta){
    let url = URL_SERVICIOS + '/alarmas/create';
    return this.http.post(url, {'proceso_id': alerta.proceso_id, 'descripcion': alerta.descripcion, 'fecha': alerta.fecha, 'hora':alerta.hora})
                .pipe(map((resp:any)=>{
                  this.alertas.push(resp.alarma);
                  return resp;
                }));
  }

  actualizarAlerta(alerta: Alerta){
    this.alertas =[];
    let url = URL_SERVICIOS + '/alarmas/update/'+alerta.id;
    return this.http.put(url, {'proceso_id': alerta.proceso_id, 'descripcion': alerta.descripcion, 'fecha': alerta.fecha, 'hora':alerta.hora})
                .pipe(map((resp:any)=>{
                  for(let i=0; i<resp.alarmas.length ; i++){
                    this.alertas.push(resp.alarmas[i]);
                  }
                  return resp;
                }));
  }
  
  cargarDatosAlerta(proceso_id:string){
    let url = URL_SERVICIOS + '/alarmas/getAlarma/'+proceso_id;
    return this.http.get(url).pipe(map((resp:any)=>{
      return resp;      
    }));
  }

  cargarAlertaPorProceso(proceso_id:string){
    this.alertas = [];
    let url = URL_SERVICIOS + '/alarmas/allAlarmas/'+proceso_id;
    return this.http.get(url).pipe(map((resp:any)=>{
      if(resp.error){
        return resp;
      }else{
        for(let i=0; i<resp.alarmas.length ; i++){
          this.alertas.push(resp.alarmas[i]);
        }
        return resp;
      }
    }, error =>{
      swal("Advertencia", "Ha ocurrido un error por favor intentalo nuevamente!", "warning");
    }));
  }

  eliminarAlerta(alerta_id:string, proceso_id:string){
    this.alertas = [];
    let url = URL_SERVICIOS + '/alarmas/delete/'+alerta_id+'/'+proceso_id;

    return this.http.delete(url).pipe(map((resp:any)=>{
      if(resp.error){
        return resp;
      }else{
        for(let i=0; i<resp.alarmas.length ; i++){
          this.alertas.push(resp.alarmas[i]);
        }
        return resp;
      }
    }, error =>{
      swal("Advertencia", "Ha ocurrido un error por favor intentalo nuevamente!", "warning");
    }));

  }

}
