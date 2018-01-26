import { Component, OnInit } from '@angular/core';
import {EventsListService} from '../events-list/events-list.service'
import {RestaurantsListService} from '../restaurants-list/restaurants-list.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lat: number = 55.758611315793935;
  lng: number = 37.62465476989747;
  zoom: number = 16;
  restaurant_list: any;
  events_list: any;
  restaurant_list_length: number;
  events_list_length: number;

  constructor(public eventsListService:EventsListService, public restaurantsListService:RestaurantsListService) {
    debugger;
    if(localStorage.length==0 || typeof JSON.parse(localStorage.getItem('events_list')) == 'undefined') {
      debugger;
      this.eventsListService.getEventsList();
      this.eventsListService.change.subscribe(data=>{
        this.events_list = data;
        this.events_list_length = data.length;
        debugger;
      })


    }else {
      debugger;
      this.events_list = JSON.parse(localStorage.getItem('events_list'));
      this.events_list_length = this.events_list.length;
      debugger;
    }

    if(localStorage.length==0 || typeof JSON.parse(localStorage.getItem('restaurants_list')) == 'undefined') {
      debugger;
      this.restaurantsListService.getRestaurantsList();
      this.restaurantsListService.change.subscribe(data=>{
        this.restaurant_list = data;
        this.restaurant_list_length = data.length;
        debugger;
      })

    }else {
      debugger;
      this.restaurant_list = JSON.parse(localStorage.getItem('restaurants_list'));
      this.restaurant_list_length = this.restaurant_list.length;
      debugger;
    }

    // this.restaurant_list = JSON.parse(localStorage.getItem('restaurants_list'));
    // this.events_list = JSON.parse(localStorage.getItem('events_list'));
    // this.restaurant_list_length = this.restaurant_list.length;
    // this.events_list_length = this.events_list.length;
    debugger;
  }

  ngOnInit() {
  }

}
