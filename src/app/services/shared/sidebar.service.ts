import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-settings',
      submenu: [
        {subtitulo: 'Usuarios', url: '/usuarios'},
        {subtitulo: 'Tipos de Procesos', url: '/tipos'},
        {subtitulo: 'Ciudades', url: '/ciudades'},
        {subtitulo: 'Juzgados', url: '/juzgados'},
        {subtitulo: 'Procesos', url: '/procesos'},
        {subtitulo: 'Notificaciones', url: '/notifications'},
      ]
    }
  ];

  constructor() { }
}
