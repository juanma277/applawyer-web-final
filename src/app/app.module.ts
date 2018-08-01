import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//RUTAS
import { APP_ROUTES } from './app.routes';

//MODULOS
import { PagesModule } from './pages/pages.module';

//FORMULARIOS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//SERVICIOS
import { ServiceModule } from './services/service.module';

//COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

//PLUGINS
import { AutocompleteModule } from 'ng2-input-autocomplete';
import { DropdownDirective } from './shared/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    ServiceModule,
    AutocompleteModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
