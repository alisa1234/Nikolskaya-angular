import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  lat: number = 55.758611315793935;
  lng: number = 37.62465476989747;
  zoom: number = 16;

  constructor() { }

  ngOnInit() {
  }

}
