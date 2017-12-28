import { Component, OnInit, Input, Output } from '@angular/core';
import { EventsListService } from '../events-list/events-list.service';

@Component({
  selector: 'app-events-block',
  templateUrl: './events-block.component.html',
  styleUrls: ['./events-block.component.scss'],
  host:{'class':'root'}
})
export class EventsBlockComponent implements OnInit {

  @Input() link: string;
  events_list: any;
  index: boolean = false;


  constructor(private eventsListService:EventsListService) {

    debugger;
    this.eventsListService.change.subscribe(data => {
      this.events_list = data.list;

    })
  }

  ngOnInit() {

  }

}
