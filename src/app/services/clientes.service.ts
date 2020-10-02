import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Importaciones propias
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private UrlEndPoint = 'http://localhost:8080/api';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  // Mostrar todos los clientes
  getClients(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.UrlEndPoint}/clientes/`).pipe(
      catchError( e =>{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${e.error.mensaje}`,
          text: `${e.error.error}`,
          timer: 2500
        })
        return throwError(e);
      })
    );
  }
  
  // Mostrar todos los clientes
  getClientsPage(page: number): Observable<any>{
    return this.http.get<any>(`${this.UrlEndPoint}/clientes/pagina/${page}`).pipe(    
      catchError( e =>{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${e.error.mensaje}`,
          text: `${e.error.error}`,
          timer: 2500
        })
        return throwError(e);
      })
    );
  }

  // Obtener cliente por id
  getClienteById(id: number): Observable<Cliente>{        
    return this.http.get(`${this.UrlEndPoint}/clientes/${id}`).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        this.router.navigate(['/clientes/buscar'])
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${e.error.mensaje}`,
          timer: 2500
        })
        return throwError(e);
      })
    );
  }

  // Servicio para buscar clientes por nombres - apellidos - email
  findClientByParams(url: String, value: string): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.UrlEndPoint}/clientes/buscar-${url}/${value}`).pipe(
      map((response: any) => response.cliente as Cliente[]),

      catchError(e => {        
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${e.error.mensaje}`,
          text: `${e.error.error}`,
          timer: 2500
        })
        return throwError(e);
      })
    );
  }


  // Método para crear cliente
  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.UrlEndPoint}/clientes/`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {        
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${e.error.mensaje}`,
          text: `${e.error.error}`,
          timer: 2500
        })
        return throwError(e);
      })
    );
  }

  // Método para actualizar cliente
  updateClient(cliente: Cliente): Observable<any>{    
    return this.http.put(`${this.UrlEndPoint}/clientes/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {        
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${e.error.mensaje}`,
          text: `${e.error.error}`,
          timer: 2500
        })
        return throwError(e);
      })

    );
  }

  // Método para eliminar cliente
  deleteClient(id: number):Observable<any>{
    return this.http.delete(`${this.UrlEndPoint}/clientes/${id}`).pipe(
      catchError(e => {        
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${e.error.mensaje}`,          
          timer: 2500
        })
        return throwError(e);
      })
    );
  }

  // Método para subir imagenes
  uploadImg(img: File, id: string): Observable<HttpEvent<{}>>{
    let formData = new FormData();    
    formData.append("file", img);
    formData.append("id", id);
    const req = new HttpRequest('POST', `${this.UrlEndPoint}/image/upload/`, formData, {
      reportProgress: true
    });    

    return this.http.request(req).pipe(      
      catchError(e => {
        console.log(e.error.error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${e.error.error}`,                    
          timer: 2500
        })        
        return throwError(e);
      })
    );
  }

}




