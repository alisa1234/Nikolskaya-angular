import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurants-main',
  templateUrl: './restaurants-main.component.html',
  styleUrls: ['./restaurants-main.component.scss']
})
export class RestaurantsMainComponent implements OnInit {

  restaurant_list: any;
  show_dishes: boolean = false;
  constructor() {
    this.restaurant_list = JSON.parse(localStorage.getItem('restaurants_list'));
    console.log(this.restaurant_list)
    debugger;
  }

  ngOnInit() {
  }

  showDishes(){
    if(this.show_dishes == true) {
      this.show_dishes = false;
    }else this.show_dishes = true;

  }
}
