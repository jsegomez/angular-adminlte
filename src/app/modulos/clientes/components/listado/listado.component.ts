import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

// Importaciones propias
import { Cliente } from '../../../../models/cliente';
import { ClientesService } from '../../../../services/clientes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit{

  clientes: Cliente[];
  cantidadPaginas: number;
  paginaActual: number;
  imageUrl = 'http://localhost:8080/api/image/profile/';

  constructor( 
    private servicioCliente: ClientesService,
    private activateRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.paginador();    
  }

  paginador(){
    this.activateRoute.paramMap.subscribe(
      params => {
        const idRuta: number = +params.get('page');
        this.servicioCliente.getClientsPage(idRuta).subscribe(
          (response: any) => {
            this.clientes = response.clientes.content;
            this.cantidadPaginas = response.clientes.totalPages;
            this.paginaActual = response.clientes.number;            
          }
        )
      }
    );
  }

  deleteClient(cliente: Cliente){
    Swal.fire({
      title: 'Seguro desea eliminar cliente?',
      text: "Una vez eliminado, no es posible recuperarlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        return this.servicioCliente.deleteClient(cliente.id).subscribe(      
          resultado => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `${resultado.mensaje}`,
              showConfirmButton: false,
              timer: 1500
            })
          }
        )
      }
    })
  }  

}

