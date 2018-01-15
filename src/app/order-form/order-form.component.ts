import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  type_delivery: {[index:string]:boolean}={};
  checked: boolean = false;
  person_count: number = 0;

  constructor() {
    this.type_delivery['delivery'] = true;
    this.type_delivery['selfdelivery'] = false;
  }

  ngOnInit() {
  }
  showDescriptionDelivery() {
    this.type_delivery['delivery'] = true;
    this.type_delivery['selfdelivery'] = false;
  }
  showDescriptionSelfdelivery() {
    this.type_delivery['selfdelivery'] = true;
    this.type_delivery['delivery'] = false;
  }
  selectCheckbox(event) {
    console.log(event.target.checked);
    if(event.target.checked) {
      this.checked = true;
    }else this.checked = false;
    debugger;
  }
  addPerson() {
    this.person_count ++;
  }
  removePerson() {
    this.person_count --;
  }

}
