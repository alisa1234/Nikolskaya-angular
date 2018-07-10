import { Component, OnInit} from '@angular/core';
import { EventsListService } from './events-list.service';
declare let $: any;

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  host:{'class':'root'}
})

export class EventsListComponent implements OnInit {

  events_list: any;
  index: string;
  id:number;
  image: any;
  header: string;
  start_date: any;
  end_date: any;
  main_text: string;
  open_event: boolean = false;
  show_more: boolean=false;
  hide_btn: boolean=false;
  start: boolean=false;
  favorite_events = [];
  constructor(public eventsListService:EventsListService) {
    // this.events_list = JSON.parse(localStorage.getItem('events_list'));
    this.favorite_events = JSON.parse(localStorage.getItem('favorite_events'));
    if(this.events_list==null|| typeof this.events_list == 'undefined' ) {
      this.eventsListService.getEventsList();
      this.eventsListService.change.subscribe(data=>{
        this.events_list = data;
        this.start = true;
        // this.restauants_list = JSON.parse(localStorage.getItem('restaurants_list'));

      })

    }
    document.body.scrollTop
  }

  ngOnInit() {}

  openEvent(id:number, image: any, header: string, start_date: string, end_date: string, main_text: string) {
    this.id = id;
    this.image = image;
    this.header = header;
    this.start_date = start_date;
    this.end_date = end_date;
    this.main_text = main_text;
    this.open_event = true;
    $(document.body).css({overflow: 'hidden'});
    let offsetX = document.body.clientWidth;
    if (offsetX<1024) {
      $(document.body).css({position: 'fixed'});
    }
    // $(document.body).css('position','fixed');

  }

}
