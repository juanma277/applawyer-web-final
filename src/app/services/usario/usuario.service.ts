import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { ProcesoService } from '../proceso/proceso.service';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token:string;

  constructor(  public http: HttpClient,
                public router: Router,
                public procesoService: ProcesoService
              ) {
                this.cargarStorage();
             }

  cargarUsuarios(desde: number = 0){
    let url = URL_SERVICIOS + '/users/paginate/'+desde;
    return this.http.get(url);  
  }

  cargarAllUsuarios(){
    let url = URL_SERVICIOS + '/users/all';
    return this.http.get(url);    
  }

  buscarUsuario(termino:string){
    let url = URL_SERVICIOS + '/users/searchUser/'+termino;
    return this.http.get(url).pipe(map((resp:any)=>{
      return resp.usuarios;      
    }));
  }

  crearUsuario( usuario: Usuario ){

    const url = URL_SERVICIOS + '/users/create';
    return this.http.post(url, { 'nombres':usuario.nombre, 'email':usuario.email, 'password': usuario.password, 'provider': 'Normal', 'uid': null, 'notificaciones': usuario.notificaciones, 'terminos': usuario.terminos })
              .pipe(map((resp:any)=>{
                return resp;
              }));
               
  }

  borrarUsuario(user_id:string){
    let url = URL_SERVICIOS + '/users/delete/'+user_id;
    return this.http.delete(url);

  }

  actualizarUsuario(usuario:Usuario, token:string){
    const url = URL_SERVICIOS + '/users/update/'+usuario.id;
    return this.http.put(url, { 'nombres':usuario.nombre, 'email':usuario.email, 'direccion': usuario.direccion, 'telefono': usuario.telefono, 'profesion': usuario.profesion, 'descripcion': usuario.descripcion, 'notificaciones': usuario.notificaciones, 'role': usuario.role, 'estado':usuario.estado, 'terminos':usuario.terminos, 'token': token })
                    .pipe(map((resp:any)=>{
                      if(resp.error){
                        swal("Error!", "Faltan datos requeridos o se encuentran duplicados", "error");
                        return false;                  
                      }
                        if(usuario.id === this.usuario.id){
                        this.cargarUsuario(resp.usuario.nombre, resp.usuario.email, resp.usuario.imagen, resp.usuario.direccion, resp.usuario.telefono, resp.usuario.descripcion, resp.usuario.profesion, resp.usuario.uid, resp.usuario.provider, resp.usuario.role, resp.usuario.estado, resp.usuario.id, resp.usuario.notificaciones, resp.usuario.terminos, this.token)
                        this.guardarStorage(token, this.usuario);
                        }
                        swal("Correcto!", "Usuario Actualizado", "success");
                        return true;
                  
                    }, error =>{
                      swal("Error!", "Ha ocurrido un error, por favor intentalo nuevamente!", "error");
                      return;                              
                    }));
  }

  actualizarDatosUsuario(usuario: Usuario, token:string){
    const url = URL_SERVICIOS + '/users/update/'+this.usuario.id;
    return this.http.put(url, { 'nombres':usuario.nombre, 'email':usuario.email, 'direccion': usuario.direccion, 'telefono': usuario.telefono, 'profesion': usuario.profesion, 'descripcion': usuario.descripcion, 'notificaciones': usuario.notificaciones, 'role': usuario.role, 'estado':usuario.estado, 'terminos':usuario.terminos, 'token': token })
              .pipe(map((resp:any)=>{
                if(resp.error){
                  swal("Error!", "Faltan datos requeridos o se encuentran duplicados", "error");
                  return false;                  
                }

                  this.cargarUsuario(resp.usuario.nombre, resp.usuario.email, resp.usuario.imagen, resp.usuario.direccion, resp.usuario.telefono, resp.usuario.descripcion, resp.usuario.profesion, resp.usuario.uid, resp.usuario.provider, resp.usuario.role, resp.usuario.estado, resp.usuario.id, resp.usuario.notificaciones, resp.usuario.terminos, this.token)
                  this.guardarStorage(token, this.usuario);
                  swal("Correcto!", "Usuario Actualizado", "success");
                  return true;

              }, error =>{
                swal("Error!", "Ha ocurrido un error, por favor intentalo nuevamente!", "error");
                return;                              
              }));
  }

  actualizarPassword(user_id:string, password:string){
    const url = URL_SERVICIOS + '/users/updatePassword/'+user_id;
    return this.http.put(url, {'user_id': user_id, 'password':password});
                 
  }

  actualizarImagen(archivo: File, user_id:string, token:string){
    let url = URL_SERVICIOS + '/users/updateImagen/'+user_id+'/web';
    return this.http.put(url, {'user_id': user_id, 'archivo':archivo}).pipe(map((resp:any)=>{
      if(resp.error){
        swal("Error!", "Faltan datos requeridos!", "error");
        return false;                  
      }
      swal("Correcto!", "Usuario Actualizado", "success");
      this.cargarUsuario(resp.usuario.nombre, resp.usuario.email, resp.usuario.imagen, resp.usuario.direccion, resp.usuario.telefono, resp.usuario.descripcion, resp.usuario.profesion, resp.usuario.uid, resp.usuario.provider, resp.usuario.role, resp.usuario.estado, resp.usuario.id, resp.usuario.notificaciones, resp.usuario.terminos, this.token)
      this.guardarStorage(token, this.usuario);
      return true;
    }, error =>{
      swal("Error!", "Ha ocurrido un error, por favor intentalo nuevamente!", "error");
      return;                              
    })); 
  }

  login(usuario: Usuario, recordar: boolean = false){

    if(recordar === true){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }
    
      const url = URL_SERVICIOS + '/login/log';
      return this.http.post(url, {'email': usuario.email, 'password': usuario.password} )
                  .pipe(map((resp:any)=>{
                    this.guardarStorage(resp.token.token, resp.usuario);
                    return resp;
                  }));
   }

   logout(){
     const url = URL_SERVICIOS + '/login/logout';
     return this.http.get(url).pipe(map(()=>{
      this.procesoService.procesos = [];
      this.usuario = null;
      this.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      this.router.navigate(['/login']);
     }, error =>{
      swal("Error!", "Ha ocurrido un error, por favor intentalo nuevamente!", "error");
      return;
     }));
   }

   guardarStorage(token:string, usuario: Usuario){
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
   }

   cargarStorage(){
     if(localStorage.getItem('token')){
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse(localStorage.getItem('usuario'));
     }else{
       this.token = '';
       this.usuario = null;
     }
   }

   cargarUsuario(nombre:string, email:string, imagen:string, direccion:string, telefono:string, descripcion:string, profesion:string, uid:string, provider:string, role:string, estado:string, id:string, notificacciones:string, terminos:string, token:string){
    this.usuario.nombre  = nombre;
    this.usuario.email  = email;
    this.usuario.imagen  = imagen;
    this.usuario.direccion  = direccion;
    this.usuario.telefono  = telefono;
    this.usuario.descripcion  = descripcion;
    this.usuario.profesion  = profesion;
    this.usuario.uid  = uid;
    this.usuario.provider  = provider;
    this.usuario.role = role;
    this.usuario.estado = estado;
    this.usuario.notificaciones = notificacciones;
    this.usuario.id = id;
    this.usuario.terminos = terminos;
  }

   logueado(){
     return (this.token.length > 5) ? true : false;
   }
}
