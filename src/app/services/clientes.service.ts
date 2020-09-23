import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private UrlEndPoint = 'http://localhost:8080/api/clientes/';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  // Mostrar todos los clientes
  getClients(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.UrlEndPoint).pipe(
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

  getClienteById(id: number): Observable<Cliente>{        
    return this.http.get(`${this.UrlEndPoint}${id}`).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        this.router.navigate(['/inicio'])
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

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.UrlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
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

  updateClient(cliente: Cliente): Observable<any>{    
    return this.http.put(`${this.UrlEndPoint}${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
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

  deleteClient(id: number):Observable<any>{
    return this.http.delete(`${this.UrlEndPoint}${id}`).pipe(
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

}




