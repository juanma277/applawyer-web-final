import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

declare function init_plugins();
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
  password:string;
  contenido:string ="";
  loader:boolean = false;

  auth2:any;

  constructor(public router: Router,
              public usuarioService: UsuarioService
             ) { }

  ngOnInit() {
    init_plugins();
    //this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1){
      this.recuerdame = true;
    }
  }

  /*
  googleInit(){
    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '628241211142-dbe8ej3e13qjnss8rgnlqc40qc9q91l2.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));

    });
  }

  attachSignin(element){
    this.auth2.attachClickHandler(element, {}, (googleUser) =>{
      
      //Datos del usuario
      const profile = googleUser.getBasicProfile();

      //Token del usuario
      const token = googleUser.getAuthResponse().id_token;

      this.usuarioService.loginGoogle(token)
          .subscribe(()=> window.location.href = '#/dashboard');
    });

  }*/

  

  ingresar(forma: NgForm) {
    
    this.loader = true;
    this.contenido = "loading";
       
    if( forma.invalid ){
      this.loader = false;
      this.contenido = "";
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this.usuarioService.login(usuario, forma.value.recuerdame)
        .subscribe((resp:any)=>{
          if(resp.error){
            this.loader = false;
            this.contenido = "";
            swal('Error', 'Datos Incorrectos', 'error');
            return;
          }else{
            this.loader = false;
            this.contenido = "";
            this.router.navigate(['/dashboard']);
          }
        }, error=>{
          this.loader = false;
          this.contenido = "";
          swal('Error', 'Ha ocurrido un error, por favor intentalo nuevamente!', 'error');  
          return;                  
      });
        
  }

}
