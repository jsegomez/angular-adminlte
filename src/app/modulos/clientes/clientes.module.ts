import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import localeES from '@angular/common/locales/global/es';
import { registerLocaleData } from '@angular/common';

// Módulos
import { SharedModule } from '../shared/shared.module';

// Componentes
import { RegistroComponent } from './components/registro/registro.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { ListadoComponent } from './components/listado/listado.component';
import { MainClientesComponent } from './components/main-clientes/main-clientes.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { PaginadorComponent } from './components/paginador/paginador.component';

registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [
    RegistroComponent,
    BuscarComponent,
    ListadoComponent,
    MainClientesComponent,
    DetalleComponent,
    PaginadorComponent,    
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    RegistroComponent,
    BuscarComponent,
    ListadoComponent,
    MainClientesComponent,
    PaginadorComponent
  ]
})
export class ClientesModule { }
