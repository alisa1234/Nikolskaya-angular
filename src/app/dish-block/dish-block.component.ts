import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dish-block',
  templateUrl: './dish-block.component.html',
  styleUrls: ['./dish-block.component.scss'],
  host: {'class': 'root'}
})
export class DishBlockComponent implements OnInit {

  @Input() menu_list: any;
  constructor() { }

  ngOnInit() {
  }

}
