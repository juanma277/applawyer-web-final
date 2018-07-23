import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Proceso } from '../../models/proceso.model';
import { map } from "rxjs/operators";

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  procesos = [];
  estadoProcesos = [];
  cantidadProcesos:number = 0; 
  procesosUser = [];
  
  constructor(public http: HttpClient) {}
   
  cargarProcesos(user_id:string){
    this.procesos = [];
    this.estadoProcesos = [];
    this.cantidadProcesos = 0;
    let url = URL_SERVICIOS + '/processes/getProcessesUser/'+user_id;
    return this.http.get(url).pipe(map((resp:any)=>{
      if(resp.error){
        swal("Advertencia", "No tienes registrados procesos!", "warning");
        return resp;
      }else{
        for(let i=0; i<resp.process.length; i++){
          this.procesos.push(resp.process[i]);
        }
        for(let y=0; y<resp.estados.length; y++){
          this.estadoProcesos.push(resp.estados[y]);          
        }
        this.cantidadProcesos = this.procesos.length;
        return resp;
      }
    }, error=>{
      swal("Advertencia", "Ha ocurrido un error por favor intentalo nuevamente!", "warning");
    }));
  }
  
  procesosPorUsuario(user_id){
    this.procesosUser = [];
    let url = URL_SERVICIOS +'/processes/getProcessesUser/'+user_id;
    return this.http.get(url).pipe(map((resp:any)=>{
      this.procesosUser = resp.process;
      return resp;
    }));    
  }

  crearProceso(proceso:Proceso){
    let url = URL_SERVICIOS + '/processes/create';
    return this.http.post(url, {'tipo_proceso': proceso.tipo_proceso_id, 'user':proceso.user_id, 'juzgado': proceso.juzgado_id, 'demandante':proceso.demandante, 'demandado':proceso.demandado, 'radicado':proceso.radicado, 'fecha':proceso.fecha});
  }

  modificarEstado(proceso_id:string, estado:string){
    let url = URL_SERVICIOS + '/processes/update/status/' + proceso_id;
    return this.http.put(url, {'estado': estado});
  }

  obtenerProceso(proceso_id:string){
    let url = URL_SERVICIOS + '/processes/getProcesses/'+proceso_id;
    return this.http.get(url).pipe(map((resp:any)=>{
      if(resp.error){
        swal("Advertencia", "El proceso no tiene actuaciones registradas!", "warning");
        return resp;
      }else{
        return resp;
      }
    }, error =>{
      swal("Advertencia", "Ha ocurrido un error por favor intentalo nuevamente!", "warning");
    }));
  }

  eliminarProceso(proceso_id:string, user_id:string){
    this.procesos = [];
    this.cantidadProcesos = 0;
    let url = URL_SERVICIOS + '/processes/delete/' + proceso_id +'/' + user_id ;

    return this.http.delete(url).pipe(map((resp:any)=>{
      return resp;
    }, error =>{
      swal("Advertencia", "Ha ocurrido un error por favor intentalo nuevamente!", "warning");      
    }));
  }



  //GRAFICAS
  procesosPorJuzgado(user_id:string){
    let url = URL_SERVICIOS +'/processes/porJuzgado/'+user_id;
    return this.http.get(url).pipe(map((resp:any)=>{
      return resp;
    }));
  }

  procesosPorTipo(user_id:string){
    let url = URL_SERVICIOS +'/processes/porTipo/'+user_id;
    return this.http.get(url).pipe(map((resp:any)=>{
      return resp;
    }));
  }

  procesosPorCiudad(user_id:string){
    let url = URL_SERVICIOS +'/processes/porCiudad/'+user_id;
    return this.http.get(url).pipe(map((resp:any)=>{
      return resp;
    }));
  }

  procesosPorEstado(user_id:string){
    this.procesos = [];
    let url = URL_SERVICIOS +'/processes/porEstado/'+user_id;
    return this.http.get(url).pipe(map((resp:any)=>{
      this.procesos = resp.process;
      return resp;
    }));
  }

  procesosPorEstadoGrafica(user_id:string){
    let url = URL_SERVICIOS +'/processes/porEstado/'+user_id;
    return this.http.get(url).pipe(map((resp:any)=>{
      return resp;
    }));
  }
}
