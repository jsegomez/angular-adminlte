import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Rutas en modulos
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { ClientesRoutingModule } from '../modulos/clientes/clientes-routing.module';

// Componentes
import { InicioComponent } from '../components/inicio/inicio.component';
import { MainClientesComponent } from '../modulos/clientes/components/main-clientes/main-clientes.component';

export const routes: Routes = [
  {path: 'inicio',   component: InicioComponent       },  
  {path: 'clientes', component: MainClientesComponent },
  {path: '**', redirectTo: 'inicio'}
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