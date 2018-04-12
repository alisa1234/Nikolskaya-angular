import { Component, OnInit} from '@angular/core';
import { EventsListService } from './events-list.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})

export class EventsListComponent implements OnInit {

  events_list: any;
  index: string;

  constructor(public eventsListService:EventsListService) {
    this.events_list = JSON.parse(localStorage.getItem('events_list'));
  }

  ngOnInit() {}

}
