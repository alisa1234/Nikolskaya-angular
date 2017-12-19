import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lat: number = 55.758611315793935;
  lng: number = 37.62465476989747;
  zoom: number = 16;

  constructor() { }

  ngOnInit() {
  }

}
