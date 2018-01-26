import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlAdresses } from '../url_adresses'
import { EventEmitter } from '@angular/core';

@Injectable()
export class RestaurantsListService {

  getEvents_list: string;
  base_url: string;
  change: EventEmitter<any>;
  restaurants_list = {list:(<any>Object)};
  index: boolean = false;

  constructor(private http: HttpClient, urlAdresses: UrlAdresses) {
    this.getEvents_list = urlAdresses.getRestaurants_list;
    this.base_url = urlAdresses.base_url;
    this.change = new EventEmitter();


  }

  getRestaurantsList() {
    this.http.get(this.base_url+this.getEvents_list)
        .subscribe(data => {
          this.restaurants_list.list = data;
          debugger;
          this.change.emit(this.restaurants_list.list);
          for(let i=0; i < this.restaurants_list.list.length; i++) {
            if (i == 2) {
              this.index = true;

            }
          }
          localStorage.setItem('restaurants_list',JSON.stringify(this.restaurants_list.list));
        })
  }

}
