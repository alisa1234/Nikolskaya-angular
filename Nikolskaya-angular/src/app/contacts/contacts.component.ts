import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  lat: number = 55.758611315793935;
  lng: number = 37.62465476989747;
  zoom: number = 16;

  constructor() { }

  ngOnInit() {
  }

}
