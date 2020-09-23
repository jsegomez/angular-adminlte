import { Component, OnInit } from '@angular/core';

// Importaciones propias
import { Cliente } from '../../../../models/cliente';
import { ClientesService } from '../../../../services/clientes.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  clientes: Cliente[];

  constructor( private servicioCliente: ClientesService ) { }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(){
    return this.servicioCliente.getClients().subscribe(
      (clientes: any) =>{
        this.clientes = clientes.clientes
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

