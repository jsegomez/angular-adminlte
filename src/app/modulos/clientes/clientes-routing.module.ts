import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { MainClientesComponent } from './components/main-clientes/main-clientes.component';
import { RegistroComponent } from './components/registro/registro.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { ListadoComponent } from './components/listado/listado.component';
import { DetalleComponent } from './components/detalle/detalle.component';


const routes: Routes = [
  {
    path: 'clientes', component: MainClientesComponent,
    children:[
      {path: 'registro',        component: RegistroComponent  },
      {path: 'buscar',          component: BuscarComponent    },
      {path: 'listado',         component: ListadoComponent   },
      {path: 'detalle/:id',     component: DetalleComponent   },
      {path: 'actualizar/:id',  component: RegistroComponent  },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
