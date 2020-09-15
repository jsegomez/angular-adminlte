import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { MainClientesComponent } from './main-clientes/main-clientes.component';
import { RegistroComponent } from './registro/registro.component';
import { BuscarComponent } from './buscar/buscar.component';
import { ListadoComponent } from './listado/listado.component';


const routes: Routes = [
  {
    path: 'clientes', component: MainClientesComponent,
    children:[
      {path: 'registro',  component: RegistroComponent  },
      {path: 'buscar',    component: BuscarComponent    },
      {path: 'listado',    component: ListadoComponent   },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
