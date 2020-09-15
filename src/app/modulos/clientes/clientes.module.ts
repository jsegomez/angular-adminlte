import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Rutas 
import { ClientesRoutingModule } from './clientes-routing.module';

// Módulos
import { SharedModule } from '../shared/shared.module';

// Componentes
import { RegistroComponent } from './registro/registro.component';
import { BuscarComponent } from './buscar/buscar.component';
import { ListadoComponent } from './listado/listado.component';
import { MainClientesComponent } from './main-clientes/main-clientes.component';


@NgModule({
  declarations: [
    RegistroComponent,
    BuscarComponent,
    ListadoComponent,
    MainClientesComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule
  ],
  exports: [
    RegistroComponent,
    BuscarComponent,
    ListadoComponent,
    MainClientesComponent
  ]
})
export class ClientesModule { }
