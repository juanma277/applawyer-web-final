import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, SubirArchivoService, ProcesoService, TipoProcesoService, JuzgadoService, CiudadService, AlertaService, AdjuntoService } from './service.index'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [

  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    SubirArchivoService,
    LoginGuardGuard,
    ProcesoService,
    TipoProcesoService,
    JuzgadoService,
    CiudadService,
    AdjuntoService,
    AlertaService
  ],
})
export class ServiceModule { }
