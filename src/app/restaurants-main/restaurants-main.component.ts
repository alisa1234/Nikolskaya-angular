import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurants-main',
  templateUrl: './restaurants-main.component.html',
  styleUrls: ['./restaurants-main.component.scss']
})
export class RestaurantsMainComponent implements OnInit {

  show_dishes: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  showDishes(){
    if(this.show_dishes == true) {
      this.show_dishes = false;
    }else this.show_dishes = true;

  }
}
