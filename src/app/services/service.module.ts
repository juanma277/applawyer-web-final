import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, SubirArchivoService, ProcesoService, TipoProcesoService, JuzgadoService, CiudadService, AlertaService, AdjuntoService } from './service.index'
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

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
    AlertaService,
    ModalUploadService
  ],
})
export class ServiceModule { }
