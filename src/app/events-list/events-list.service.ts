import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlAdresses } from '../url_adresses'

@Injectable()
export class EventsListService {
  getEvents_list: string;
  base_url: string;
  change: EventEmitter<any>;
  events_list = {list:(<any>Object)};
  index: boolean = false;

  constructor(private http: HttpClient, urlAdresses: UrlAdresses) {

    this.getEvents_list = urlAdresses.getEvents_list;
    this.base_url = urlAdresses.base_url;
    this.change = new EventEmitter();
  }

  getEventsList() {
    this.http.get(this.base_url+this.getEvents_list)
        .subscribe(data => {
          this.events_list.list = data;
          this.change.emit(this.events_list.list);


          for(let i=0; i < this.events_list.list.length; i++) {

            if (i == 2) {
              this.index = true;
            }
          }
        })
  }

}
