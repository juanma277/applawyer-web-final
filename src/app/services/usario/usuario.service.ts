import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http: HttpClient,
    public router: Router,) { }

  crearUsuario( usuario: Usuario ){

    const url = URL_SERVICIOS + '/users/create';
    return this.http.post(url, { 'nombres':usuario.nombre, 'email':usuario.email, 'password': usuario.password, 'provider': 'Normal', 'uid': null, 'notificaciones': usuario.notificaciones, 'terminos': usuario.terminos })
              .pipe(map((resp:any)=>{
                return resp;
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
                    return resp;
                  }));
   }
}
