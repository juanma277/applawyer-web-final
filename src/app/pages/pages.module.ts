import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


@NgModule({
    declarations:[
        DashboardComponent,
        PagesComponent,
        AccountSettingsComponent
    ],
    exports: [
        DashboardComponent,
        PagesComponent     
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES
    ]
})

export class PagesModule {}