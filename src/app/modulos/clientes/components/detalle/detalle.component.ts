import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Importaciones propias
import { Cliente } from '../../../../models/cliente';
import { ClientesService } from '../../../../services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente: Cliente = new Cliente();

  constructor(
    private serviceCliente: ClientesService,
    private paramsRuta: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getClient();    
  }

  getClient(): void{
    this.paramsRuta.params.subscribe(
      params => {
        const idRuta = params.id;        
        this.serviceCliente.getClienteById(idRuta).subscribe(
          response => this.cliente = response
        )
      }
    );
  }

  // Eliminar un cliente
  deleteClient(id: number){
    Swal.fire({
      title: 'Seguro desea eliminar cliente?',
      text: "Una vez eliminado no es posible recuperarlo!",
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        return this.serviceCliente.deleteClient(id).subscribe(
          resultado => {
            this.router.navigate(['/clientes/listado'])
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `${resultado.mensaje}`,
              showConfirmButton: false,
              timer: 3000
            })
          }
        )
      }
    })
  }
  
}
