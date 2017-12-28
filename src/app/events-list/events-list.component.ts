import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UrlAdresses} from '../url_adresses'

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  getEvents_list: string;
  base_url: string;
  events_list: any;

  constructor(private http: HttpClient, urlAdresses: UrlAdresses) {
    this.getEvents_list = urlAdresses.getEvents_list;
    this.base_url = urlAdresses.base_url;

    this.http.get(this.base_url+this.getEvents_list)
        .subscribe(data => {
          this.events_list = data;
          // localStorage.setItem('restaurants_list',JSON.stringify(this.restauants_list));
    })
  }

  ngOnInit() {
  }

}
