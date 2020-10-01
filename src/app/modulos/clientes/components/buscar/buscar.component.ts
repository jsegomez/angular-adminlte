import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../../services/clientes.service';
import { Cliente } from '../../../../models/cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  constructor(private serviceCliente: ClientesService) { }

  parametro: string = null;
  textoInput: string = null;
  clientes: Cliente[] = null;
  imageUrl: string = 'http://localhost:8080/api/image/profile/';
  buscando: boolean = false;

  ngOnInit(): void {
  }

  findByParams(){
    if(this.parametro == null || this.textoInput == null){
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Favor indicar categoría y parámetro de búsqueda',
      })
      return;
    }
    this.buscando = true

    if(this.parametro == 'id'){          
      let idCliente: number = +this.textoInput;
      this.serviceCliente.getClienteById(idCliente).subscribe(
        resolve => { 
          this.clientes = [resolve];
          this.buscando = false;
        },
        catchError => {
          this.buscando = false;
        }
      );
    }else{
      this.serviceCliente.findClientByParams(this.parametro, this.textoInput).subscribe(
        response => {
          this.clientes = response;
          this.buscando = false;
          this.textoInput = null;
        },
        catchError => {
          this.clientes = null;
          this.buscando = false;
          this.textoInput = null;
          console.log(catchError)     
        }
      )
    }    
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
        return this.serviceCliente.deleteClient(cliente.id).subscribe(      
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
