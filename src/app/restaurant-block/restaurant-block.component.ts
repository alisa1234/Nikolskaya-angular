import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant-block',
  templateUrl: './restaurant-block.component.html',
  styleUrls: ['./restaurant-block.component.scss'],
  host:{'class':'root'}
})
export class RestaurantBlockComponent implements OnInit {

  // picture: string;
  // name: string;
  @Input() tag: string;
  @Input() time: string;
  // @Input() logo: string;
  @Input() restaurants_list: any;
  @Input() link: string;
  time_hidden = false;
  pct:string;


  constructor() {
    this.pct = 'http://decusagency.westeurope.cloudapp.azure.com:8090/VirtualCardSecureService.svc/NewsImageFor?id=1'
    // if (this.restaurants_list.Time != null) {
    //   this.time_hidden = true;
    // }
  }

  ngOnInit() {
  }

}
