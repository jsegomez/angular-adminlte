import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Rutas en modulos
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { ClientesRoutingModule } from '../modulos/clientes/clientes-routing.module';

// Componentes
import { MainClientesComponent } from '../modulos/clientes/main-clientes/main-clientes.component';
import { InicioComponent } from '../components/inicio/inicio.component';

export const routes: Routes = [
  {path: '/inicio', component: InicioComponent },  
  {path: 'clientes', component: MainClientesComponent },  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    ClientesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }