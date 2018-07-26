import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, SubirArchivoService, ProcesoService, TipoProcesoService, JuzgadoService, CiudadService, AlertaService, AdjuntoService } from './service.index'
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { ModalNuevoUsuarioService } from '../components/modal-nuevo-usuario/modal-nuevo-usuario.service';
import { ModalNuevoCiudadService } from '../components/modal-nuevo-ciudad/modal-nuevo-ciudad.service';
import { ModalNuevoJuzgadoService } from '../components/modal-nuevo-juzgado/modal-nuevo-juzgado.service';
import { ModalNuevoNotificacionService } from '../components/modal-nuevo-notificacion/modal-nuevo-notificacion.service';
import { ModalNuevoProcesoService } from '../components/modal-nuevo-proceso/modal-nuevo-proceso.service';
import { ModalNuevoProcesoAdminService } from '../components/modal-nuevo-proceso-admin/modal-nuevo-proceso-admin.service';
import { ModalNuevoTipoService } from '../components/modal-nuevo-tipo/modal-nuevo-tipo.service';

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
    ModalUploadService,
    ModalNuevoUsuarioService,
    ModalNuevoCiudadService,
    ModalNuevoJuzgadoService,
    ModalNuevoNotificacionService,
    ModalNuevoProcesoService,
    ModalNuevoProcesoAdminService,
    ModalNuevoTipoService
  ],
})
export class ServiceModule { }
