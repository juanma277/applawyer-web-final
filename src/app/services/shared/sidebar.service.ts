import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Prinicipal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {subtitulo: 'Dashboard', url: '/dashboard'}
      ]
    }
  ];

  constructor() { }
}
