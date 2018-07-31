import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcesoService, UsuarioService } from '../../services/service.index';
import { Proceso } from '../../models/proceso.model';

import swal from 'sweetalert2';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  procesos: Proceso[] = [];
  cuenta:number;

  constructor(public activatedRoute: ActivatedRoute, public procesoService: ProcesoService, public usuarioService: UsuarioService) 
  {
    this.activatedRoute.params.subscribe( params =>{
      let termino = params['termino'];
      this.buscar(termino);
    });

  }

  ngOnInit() {
  }

  buscar(termino:string){
    this.procesoService.buscarProcesos(termino, this.usuarioService.usuario.id).subscribe((resp:any)=>{
      this.procesos = resp.procesos;
      this.cuenta = resp.cuenta
      if(this.cuenta <= 0){
        swal({
          position: 'top-end',
          type: 'warning',
          title: 'No se encontraron procesos con el termino ingresado.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

}
