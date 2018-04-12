import { Component, OnInit } from '@angular/core';
import {UrlAdresses} from '../url_adresses';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})

export class RestaurantsListComponent implements OnInit {

  base_url: string;
  getRestaurants_list: string;
  restauants_list: any;

  constructor(private urlAdresses: UrlAdresses) {

    this.base_url = urlAdresses.base_url;
    this.getRestaurants_list = urlAdresses.getRestaurants_list;
    this.restauants_list = JSON.parse(localStorage.getItem('restaurants_list'));
  }

  ngOnInit() {}

}
