import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor( public usuarioService: UsuarioService, public router: Router) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  buscar(termino:string){
    this.router.navigate(['/busqueda', termino]);
  }

  logout(){
    swal({
      title: 'Salir',
      text: "¿Seguro que deseas salir de la aplicación?",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.logout().subscribe();
      }
    });
  }
}
