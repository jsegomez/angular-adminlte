import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

// Propias
import { Cliente } from '../../../../models/cliente';
import { ClientesService } from '../../../../services/clientes.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  cliente: Cliente = new Cliente;
  idRuta: number;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientesService,
    private router: Router,
    private idRoute: ActivatedRoute
  ) {    
    
  }

  ngOnInit(): void {
    this.loadClient()    
  }

  public formCrearCliente = this.formBuilder.group({
    nombre    : [this.cliente.nombre, [Validators.required, Validators.minLength(2)]],
    apellido  : [this.cliente.apellido, [Validators.required, Validators.minLength(2)]],
    email     : [this.cliente.email, [Validators.required, Validators.email]],    
  });  

  // Validación de campos
  campoNoValido(campo: string): boolean{
    if(this.formCrearCliente.get(campo).invalid && this.formCrearCliente.get(campo).touched){
      return true;
    }else{
      return false;
    }
  }

  // Formulario para crear un nuevo cliente
  create(){
    if(this.formCrearCliente.valid){
      this.cliente = this.formCrearCliente.value;
      this.clientService.create(this.cliente).subscribe(
        (resultado: any) => {
          this.router.navigate([`/clientes/detalle/${resultado.cliente.id}`]);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${resultado.mensaje}`,
            showConfirmButton: false,
            timer: 3000
          })
        }
      );     
    }else{
      this.formCrearCliente.markAllAsTouched()
    }
  }

  //Carga cliente si existe id en ruta
  loadClient(){
    this.idRoute.params.subscribe(
      params => {
        this.idRuta = params['id'];
        if(this.idRuta > 0){
          this.clientService.getClienteById(this.idRuta).subscribe(
            (client: any) => {
              this.cliente = client.cliente
              const { nombre, apellido, email } = this.cliente;
              this.formCrearCliente.setValue({nombre, apellido, email})
            }
          )
        }
      }
    )
  }

  // Método para actualizar cliente
  update(): void{
    if(this.formCrearCliente.valid){
      const { nombre, apellido, email } = this.formCrearCliente.value;
      const { id, createAt } = this.cliente;
      this.cliente = {id, nombre, apellido, email, createAt};

      this.clientService.updateClient(this.cliente).subscribe(
        cliente => {
          this.router.navigate([`/clientes/detalle/${cliente.cliente.id}`]),
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente actualizado con éxito',
            showConfirmButton: false,
            timer: 3000
          })
        }      
      )
    }
  }

}
