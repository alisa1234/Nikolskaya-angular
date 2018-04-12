import { Component, OnInit, Input } from '@angular/core';
import { EventsListService } from '../events-list/events-list.service';

@Component({
  selector: 'app-events-block',
  templateUrl: './events-block.component.html',
  styleUrls: ['./events-block.component.scss'],
  host:{'class':'root'}
})

export class EventsBlockComponent implements OnInit {

  @Input() link: string;
  @Input() events_list: any;
  index: boolean = false;

  constructor(private eventsListService:EventsListService) {

    this.eventsListService.change.subscribe(data => {
      this.events_list = data.list;
    })
  }

  ngOnInit() {}

}
