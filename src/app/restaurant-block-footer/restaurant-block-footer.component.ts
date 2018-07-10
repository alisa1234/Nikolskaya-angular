import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant-block-footer',
  templateUrl: './restaurant-block-footer.component.html',
  styleUrls: ['./restaurant-block-footer.component.scss'],
  host: {'class': 'root'}
})

export class RestaurantBlockFooterComponent implements OnInit {

  @Input() tags;
  constructor() { }

  ngOnInit() {}

}
