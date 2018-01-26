import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {'class': 'root'}
})
export class LoginComponent implements OnInit {

  sign_in: boolean = false;
  login:boolean  = false;
  constructor() {
    this.sign_in = true;
  }

  ngOnInit() {
  }

}
