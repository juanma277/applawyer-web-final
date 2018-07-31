import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { MisProcesosComponent } from './mis-procesos/mis-procesos.component';
import { InformesComponent } from './informes/informes.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { ProcesoDetalleComponent } from './proceso-detalle/proceso-detalle.component';
import { PorJuzgadoComponent } from './por-juzgado/por-juzgado.component';
import { PorTipoComponent } from './por-tipo/por-tipo.component';
import { PorCiudadComponent } from './por-ciudad/por-ciudad.component';
import { PorEstadoComponent } from './por-estado/por-estado.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TiposProcesosComponent } from './tipos-procesos/tipos-procesos.component';
import { CiudadesComponent } from './ciudades/ciudades.component';
import { JuzgadosComponent } from './juzgados/juzgados.component';
import { ProcesosComponent } from './procesos/procesos.component';
import { ConfigNotificacionesComponent } from './config-notificaciones/config-notificaciones.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children:[
            {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
            {path: 'settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes'}},
            {path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil de Usuario'}},
            {path: 'misprocesos', component: MisProcesosComponent, data: {titulo: 'Mis Procesos'}},
            {path: 'proceso/detalle/:id', component: ProcesoDetalleComponent, data: {titulo: 'Detalle de Proceso'}},
            {path: 'informes', component: InformesComponent, data: {titulo: 'Informes'}},
            {path: 'porJuzgado', component: PorJuzgadoComponent, data: {titulo: 'Informe Por Juzgado'}},
            {path: 'porTipo', component: PorTipoComponent, data: {titulo: 'Informe Por Tipo'}},
            {path: 'porCiudad', component: PorCiudadComponent, data: {titulo: 'Informe Por Ciudad'}},
            {path: 'porEstado', component: PorEstadoComponent, data: {titulo: 'Informe Por Estado'}},
            {path: 'notificaciones', component: NotificacionesComponent, data: {titulo: 'Notificaciones'}},
            {path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'}},

            //MANTENIMIENTO
            {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuarios'}},
            {path: 'tipos', component: TiposProcesosComponent, data: {titulo: 'Mantenimiento de Tipos de Proceso'}},
            {path: 'ciudades', component: CiudadesComponent, data: {titulo: 'Mantenimiento de Ciudades'}},
            {path: 'juzgados', component: JuzgadosComponent, data: {titulo: 'Mantenimiento de Juzgados'}},
            {path: 'procesos', component: ProcesosComponent, data: {titulo: 'Mantenimiento de Procesos'}},
            {path: 'notifications', component: ConfigNotificacionesComponent, data: {titulo: 'Mantenimiento de Notificaciones'}},

            {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    }        
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
