import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//COMPONENTES
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { MisProcesosComponent } from './mis-procesos/mis-procesos.component';
import { InformesComponent } from './informes/informes.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { ProcesoDetalleComponent } from './proceso-detalle/proceso-detalle.component';
import { PorJuzgadoComponent } from './por-juzgado/por-juzgado.component';
import { PorTipoComponent } from './por-tipo/por-tipo.component';
import { PorEstadoComponent } from './por-estado/por-estado.component';
import { PorCiudadComponent } from './por-ciudad/por-ciudad.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TiposProcesosComponent } from './tipos-procesos/tipos-procesos.component';
import { CiudadesComponent } from './ciudades/ciudades.component';
import { JuzgadosComponent } from './juzgados/juzgados.component';
import { ProcesosComponent } from './procesos/procesos.component';
import { ConfigNotificacionesComponent } from './config-notificaciones/config-notificaciones.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { ModalNuevoUsuarioComponent } from '../components/modal-nuevo-usuario/modal-nuevo-usuario.component';
import { ModalNuevoProcesoComponent } from '../components/modal-nuevo-proceso/modal-nuevo-proceso.component';
import { ModalNuevoTipoComponent } from '../components/modal-nuevo-tipo/modal-nuevo-tipo.component';
import { ModalNuevoCiudadComponent } from '../components/modal-nuevo-ciudad/modal-nuevo-ciudad.component';
import { ModalNuevoJuzgadoComponent } from '../components/modal-nuevo-juzgado/modal-nuevo-juzgado.component';
import { ModalNuevoProcesoAdminComponent } from '../components/modal-nuevo-proceso-admin/modal-nuevo-proceso-admin.component';
import { ModalNuevoNotificacionComponent } from '../components/modal-nuevo-notificacion/modal-nuevo-notificacion.component';


//SWEETALERT2
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

//PIPES - MODULOS
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';

//ROUTES
import { PAGES_ROUTES } from './pages.routes';

//NGCHARTS.JS
import { ChartsModule } from 'ng2-charts';
import { BusquedaComponent } from './busqueda/busqueda.component';



@NgModule({
    declarations:[
        DashboardComponent,
        PagesComponent,
        AccountSettingsComponent,
        ProfileComponent,
        MisProcesosComponent,
        InformesComponent,
        NotificacionesComponent,
        ProcesoDetalleComponent,
        PorJuzgadoComponent,
        PorTipoComponent,
        PorEstadoComponent,
        PorCiudadComponent,
        UsuariosComponent,
        TiposProcesosComponent,
        CiudadesComponent,
        JuzgadosComponent,
        ProcesosComponent,
        ConfigNotificacionesComponent,
        ModalUploadComponent,
        ModalNuevoUsuarioComponent,
        ModalNuevoProcesoComponent,
        ModalNuevoTipoComponent,
        ModalNuevoCiudadComponent,
        ModalNuevoJuzgadoComponent,
        ModalNuevoProcesoAdminComponent,
        ModalNuevoNotificacionComponent,
        BusquedaComponent
    ],
    exports: [
        DashboardComponent,
        PagesComponent     
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        PipesModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        TooltipModule,
        SweetAlert2Module.forRoot()
    ]
})

export class PagesModule {}