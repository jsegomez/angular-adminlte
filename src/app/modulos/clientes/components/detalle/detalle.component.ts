import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Importaciones propias
import { Cliente } from '../../../../models/cliente';
import { ClientesService } from '../../../../services/clientes.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente: Cliente = new Cliente();
  image:string = this.cliente.img;
  inputImg: boolean = false;
  fotoSeleccionada: File = null;
  fotoSeleccionadaName: string = '';
  imageUrl = 'http://localhost:8080/api/image/profile/';  
  progress: number = 0;
  mostrarBarra = false;

  constructor(
    private serviceCliente: ClientesService,
    private paramsRuta: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getClient();
  }

  // Obtiene clientes por id ruta
  getClient(): void{
    this.paramsRuta.params.subscribe(
      params => {
        const idRuta = params.id;        
        this.serviceCliente.getClienteById(idRuta).subscribe(
          response => {            
            this.cliente = response;
          }          
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

  // Muestra/oculta Input para carga de imagenes
  mostrarInputImg(){
    this.inputImg = !this.inputImg;
  }
    

  // Función para seleccionar cargar imagen del input
  seleccionarImg(event){    
    this.fotoSeleccionada = event.target.files[0];
    this.progress = 0;    
    this.fotoSeleccionadaName = this.fotoSeleccionada.name;  
    if(this.fotoSeleccionada.type.indexOf('image') < 0){      
      this.fotoSeleccionada = null
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Archivo seleccionado no es una imagen',
        showConfirmButton: true,
        timer: 2500
      });                  
    } 
  }

  // Subir fotos
  subirFoto(){    
    if(!this.fotoSeleccionada){      
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Favor seleccione una foto',
        showConfirmButton: true,
        timer: 2500
      })
    }else{
      this.serviceCliente.uploadImg(this.fotoSeleccionada, (this.cliente.id).toString()).subscribe(
        event => {
          if(event.type === HttpEventType.UploadProgress){
            this.progress = Math.round((event.loaded/event.total) * 100);
            this.inputImg = false;
            this.mostrarBarra = true;
          }else if(event.type === HttpEventType.Response){
            let response:any = event.body;
            this.cliente = response.cliente as Cliente;
        
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Foto cargada con éxito',
              showConfirmButton: false,
              timer: 3000
            });
            this.mostrarBarra = false;
            this.fotoSeleccionada = null;
            this.fotoSeleccionadaName = '';
          }
        },
      );
    }
  }
  
}
