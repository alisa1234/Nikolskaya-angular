import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selfdelivery',
  templateUrl: './selfdelivery.component.html',
  styleUrls: ['./selfdelivery.component.scss'],
  host: {'class' : 'root'}
})

export class SelfdeliveryComponent implements OnInit {

  new_buyer: boolean = true;
  regular_customer: boolean = false;

  constructor() { }

  ngOnInit() {}

}
