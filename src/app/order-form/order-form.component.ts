import { Component, OnInit } from '@angular/core';
import { UrlAdresses } from '../url_adresses';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { OrderFormService } from './order-form.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  type_delivery: {[index:string]:boolean}={};
  checked: boolean = false;
  by_time: boolean = false;
  person_count: number = 0;

  base_url: string;
  // getClientAdresses: string;


  constructor(private urlAdresses:UrlAdresses, private http: HttpClient, private orderFormService:OrderFormService) {
    this.base_url = urlAdresses.base_url;
    // this.getClientAdresses = urlAdresses.getClientAdresses;
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

  }
  addPerson() {
    this.person_count ++;
  }
  removePerson() {
    this.person_count --;
    if(this.person_count<0) {
      this.person_count = 0;
    }
  }
  selectTime(event) {
    // this.by_time = true;
  }

}
