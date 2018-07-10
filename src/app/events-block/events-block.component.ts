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
  @Input() _parent: any;
  index: boolean = false;
  @Input() show_more: boolean=false;
  @Input() hide_btn: boolean=false;

  constructor(private eventsListService:EventsListService) {}

  ngOnInit() {}

}
