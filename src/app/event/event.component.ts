import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event_list = [];
  event_id: number;
  main_text: string;
  img_url: string;
  img_title: string;

  constructor(private route: ActivatedRoute) {
    this.event_list = JSON.parse(localStorage.getItem('events_list'));
    this.route.params.subscribe(params => {
      this.event_id = +params['id'];
    });
    this.event_list.map((text)=>{
      if(text.Id == this.event_id) {
        this.main_text = text.Body;
        this.img_url = text.ImagePath;
        this.img_title = text.Header;
      }
    })
  }

  ngOnInit() {
  }

}
