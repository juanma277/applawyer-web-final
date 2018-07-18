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
            {path: 'notificaciones', component: NotificacionesComponent, data: {titulo: 'Notificaciones'}},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    }        
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
