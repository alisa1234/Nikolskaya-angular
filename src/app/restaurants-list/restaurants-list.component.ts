import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UrlAdresses} from '../url_adresses'
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




    if(localStorage.getItem('restaurants_list') != null){
      this.restauants_list = JSON.parse(localStorage.getItem('restaurants_list'));
      debugger;
    }else{
      this.http.get(this.base_url+this.getRestaurants_list)
          .subscribe(data => {
            this.restauants_list = data;
            localStorage.setItem('restaurants_list',JSON.stringify(this.restauants_list));

          })
    }





  }

  ngOnInit() {
  }

}
