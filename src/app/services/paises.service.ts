import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Pais } from '../models/pais';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http: HttpClient) { }

  private urlEndPoint = 'https://restcountries.eu/rest/v2/all';
  private springUrlPais = 'http://localhost:8080/api/paises/';

  getPaisesApiExt(): Observable<any>{
    return this.http.get(this.urlEndPoint).pipe(
      map((resp:any[]) => {
        return resp.map( pais => {
          return {
            nombre: pais.name
          }
        });
      })
    );
  }

  getPaises(): Observable<Pais[]>{
    return this.http.get<Pais[]>(this.springUrlPais).pipe(
      map((resp: any) => resp.paises as Pais[]),
      catchError(e =>{
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

}
