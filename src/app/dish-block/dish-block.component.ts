import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dish-block',
  templateUrl: './dish-block.component.html',
  styleUrls: ['./dish-block.component.scss']
})
export class DishBlockComponent implements OnInit {

  @Input() restaurants_list: any;
  constructor() { }

  ngOnInit() {
  }

}
