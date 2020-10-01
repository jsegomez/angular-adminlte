import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit, OnChanges{
  constructor() {}

  @Input() paginaActual:number;
  @Input() cantidadPaginas: number;
  paginas: number[] = [];
  desde: number;
  hasta: number;

  ngOnChanges(): void {  
    this.paginas = [];
    this.paginador();
  }

  ngOnInit(): void {} 

  paginador(){
    this.desde = Math.min(Math.max(0, this.paginaActual - 5), this.cantidadPaginas - 6);
    this.hasta = Math.max(Math.min(this.cantidadPaginas - 1, this.paginaActual + 6), 8);

    if(this.cantidadPaginas <= 9){
      for (let index = 0; index < this.cantidadPaginas; index++) {
        this.paginas.push(index);
        console.log(index);        
      }
    }else{
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde)
    }
  }
}



