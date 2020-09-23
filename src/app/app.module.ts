import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import localeES from '@angular/common/locales/global/es';
import { registerLocaleData } from '@angular/common';

// Componentes
import { AppComponent } from './app.component';

// Modulos personalizados
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './modulos/clientes/clientes.module';
import { SharedModule } from './modulos/shared/shared.module';

// Rutas
import { AppRoutingModule } from './app-routing/app-routing.module';
import { InicioComponent } from './components/inicio/inicio.component';


registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AuthModule,    
    ClientesModule,
    SharedModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
