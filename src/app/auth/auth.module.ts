import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Rutas
import { AuthRoutingModule } from './auth-routing.module';

// Componentes
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [LoginComponent, RegistroComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  exports: [
    LoginComponent,
    RegistroComponent
  ]
})
export class AuthModule { }
