import { Component, OnInit } from '@angular/core';
import { ServiceService } from './services/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private services:ServiceService){}

  ngOnInit(): void {
    const city = 'london'
  }
}
