import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';


import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(  public sideBarService: SidebarService,
                public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  logout(){
    swal({
      title: 'Salir',
      text: '¿Seguro que deseas salir de la aplicación?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this.usuarioService.logout().subscribe();
      } 
    });
  }

}
