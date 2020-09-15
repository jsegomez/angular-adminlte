import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Componentes
import { AppComponent } from './app.component';

// Modulos personalizados
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './modulos/clientes/clientes.module';
import { SharedModule } from './modulos/shared/shared.module';

// Rutas
import { AppRoutingModule } from './app-routing/app-routing.module';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,    
    ClientesModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
