import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurants-main',
  templateUrl: './restaurants-main.component.html',
  styleUrls: ['./restaurants-main.component.scss']
})
export class RestaurantsMainComponent implements OnInit {

  restaurant_list: any;
  restaurant_list_current: any;
  restaurant_list_menu: any;
  restaurant_categories: any;
  show_dishes: boolean = false;
  restaurant_id: any;
  constructor(private route: ActivatedRoute) {
    this.restaurant_list = JSON.parse(localStorage.getItem('restaurants_list'));
    // this.restaurant_categories = this.restaurant_list.RestaurantCategories;
    debugger;
    this.route.params.subscribe(params => {
      this.restaurant_id = +params['id'];
    });
    for (let number in this.restaurant_list) {
      if(this.restaurant_list[number].Number == this.restaurant_id) {
        this.restaurant_list_current = this.restaurant_list[number];
        this.restaurant_list_menu = this.restaurant_list[number].RestaurantCategories;
        debugger;
      }
    }
  }

  ngOnInit() {
  }

  showDishes(){
    if(this.show_dishes == true) {
      this.show_dishes = false;
    }else this.show_dishes = true;

  }
}
