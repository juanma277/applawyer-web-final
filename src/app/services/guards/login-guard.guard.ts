import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(  public usarioService: UsuarioService,
                public router: Router){

  }

  canActivate(){
    if(this.usarioService.logueado()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
    
  }
  
}
