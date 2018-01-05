import { Component, OnInit} from '@angular/core';
import { EventsListService } from '../events-list/events-list.service'


@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  index: string;


  constructor(public eventsListService:EventsListService) {
    debugger
    this.eventsListService.getEventsList();
  }

  ngOnInit() {
  }

}
