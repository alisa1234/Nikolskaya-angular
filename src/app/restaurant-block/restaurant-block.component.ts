import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-block',
  templateUrl: './restaurant-block.component.html',
  styleUrls: ['./restaurant-block.component.scss'],
  host:{'class':'root'}
})
export class RestaurantBlockComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
