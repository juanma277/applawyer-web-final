import { Component } from '@angular/core';
import { SettingsService, ProcesoService } from './services/service.index';
import { UsuarioService } from './services/usario/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( public ajustesService: SettingsService, public usuarioService: UsuarioService, public procesoService:ProcesoService){
    //this.procesoService.procesosPorEstado(this.usuarioService.usuario.id).subscribe();
  }
}
