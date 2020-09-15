import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  date:Date = new Date();
  printDate:string = `${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()}`;


  ngOnInit(): void {
    
  }

}
