import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant-block',
  templateUrl: './restaurant-block.component.html',
  styleUrls: ['./restaurant-block.component.scss'],
  host:{'class':'root'}
})

export class RestaurantBlockComponent implements OnInit {

  @Input() tag: string;
  @Input() time: string;
  @Input() restaurants_list: any;
  @Input() link: string;

  constructor() {}

  ngOnInit() {}

}
