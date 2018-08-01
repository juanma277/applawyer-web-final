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

  procesos: Proceso[] = [];
  estadoProcesos = [];
  cantidadProcesos:number = 0; 
  procesosUser = [];
  
  
  constructor(public http: HttpClient) {}

  cargarTodos(){
    let url = URL_SERVICIOS + '/processes/all';
    return this.http.get(url);      
  }
   
  cargarProcesos(user_id:string, desde:number = 0){
    this.procesos = [];
    this.estadoProcesos = [];
    this.cantidadProcesos = 0;
    let url = URL_SERVICIOS + '/processes/getProcessesUser/'+user_id+'/'+desde;
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

  cargarProcesosAdmin(desde: number = 0){
    let url = URL_SERVICIOS + '/processes/paginate/'+desde;
    return this.http.get(url);  
  }

  cargarProcesosPaginados(user_id:string, desde: number = 0){
    let url = URL_SERVICIOS + '/processes/getProcessesUser/'+user_id+'/'+desde;
    return this.http.get(url).pipe(map((resp:any)=>{
      this.cantidadProcesos = resp.cuenta;
      return resp;
    }));  
  }

  buscarProceso(termino:string){
    let url = URL_SERVICIOS + '/processes/searchProccess/'+termino;
    return this.http.get(url).pipe(map((resp:any)=>{
      return resp.procesos;      
    }));
  }
  
  procesosPorUsuario(user_id){
    this.procesosUser = [];
    let url = URL_SERVICIOS +'/processes/getProcessesUser/'+user_id+'/'+0;
    return this.http.get(url).pipe(map((resp:any)=>{
      this.procesosUser = resp.process;
      return resp;
    }));    
  }

  crearProceso(proceso:Proceso){
    let url = URL_SERVICIOS + '/processes/create';
    return this.http.post(url, {'tipo_proceso': proceso.tipo, 'user':proceso.user, 'juzgado': proceso.juzgado, 'demandante':proceso.demandante, 'demandado':proceso.demandado, 'radicado':proceso.radicado, 'fecha':proceso.fecha});
  }

  buscarProcesos(termino:string, id:string){
    let url = URL_SERVICIOS + '/processes/searchProcesos/'+termino+'/'+id;
    return this.http.get(url).pipe(map((resp:any)=>{
      this.procesos = [];
      this.procesos = resp.procesos
      return resp;    
    }));    
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

  actualizarProceso(proceso:Proceso, token:string){
    const url = URL_SERVICIOS + '/processes/update/'+proceso.id;
    return this.http.put(url, { 'tipo_proceso':proceso.tipo, 'juzgado':proceso.juzgado, 'demandante': proceso.demandante, 'demandado': proceso.demandado, 'radicado': proceso.radicado, 'fecha': proceso.fecha, 'estado': proceso.estado, 'token': token })
                    .pipe(map((resp:any)=>{
                      if(resp.error){
                        swal("Error!", "Faltan datos requeridos o se encuentran duplicados", "error");
                        return false;                  
                      }
                        swal("Correcto!", "Proceso Actualizado", "success");
                        return true;
                  
                    }, error =>{
                      swal("Error!", "Ha ocurrido un error, por favor intentalo nuevamente!", "error");
                      return;                              
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

  borrarProceso(proceso_id:string){
    let url = URL_SERVICIOS + '/processes/deleteAdmin/'+proceso_id;
    return this.http.delete(url);

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
