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