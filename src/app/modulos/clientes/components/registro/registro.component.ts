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
    private clientService: ClientesService,
    private formBuilder: FormBuilder,
    private idRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClient()    
  }

  public formCrearCliente = this.formBuilder.group({
    nombre    : ['', [Validators.required, Validators.minLength(2)]],
    apellido  : ['', [Validators.required, Validators.minLength(2)]],
    email     : ['', [Validators.required, Validators.email]],    
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
            timer: 2000
          })
        }
      );     
    }else{
      this.formCrearCliente.markAllAsTouched();
      return;
    }
  }

  //Carga cliente si existe id en ruta
  loadClient(){
    this.idRoute.params.subscribe(
      params => {
        this.idRuta = params['id'];        
        if(this.idRuta){
          this.clientService.getClienteById(this.idRuta).subscribe(
            (client: any) => {
              this.cliente = client              
              const { nombre, apellido, email,  } = this.cliente;
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
            timer: 2000
          })
        }      
      )
    }
  }

}
