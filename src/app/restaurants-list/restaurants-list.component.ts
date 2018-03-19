import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UrlAdresses} from '../url_adresses'
//TODO
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit {

  base_url: string;
  getRestaurants_list: string;
  restauants_list: any;



  constructor(private http: HttpClient, private urlAdresses: UrlAdresses) {

    this.base_url = urlAdresses.base_url;
    this.getRestaurants_list = urlAdresses.getRestaurants_list;


      this.restauants_list = JSON.parse(localStorage.getItem('restaurants_list'));






  }

  ngOnInit() {
  }

}
