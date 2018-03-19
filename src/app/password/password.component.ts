import { Component, OnInit, Input, Output } from '@angular/core';
import { UrlAdresses} from '../url_adresses';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LoginComponent} from "../login/login.component";
import {RouterLinkActive, Router, NavigationEnd, ActivatedRoute,NavigationStart} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  host: {'class': 'root'}
})
export class PasswordComponent extends LoginComponent implements OnInit {

  base_url: string;
  resetPassword:string;
  @Input() hidden = true;
  @Input() hide_component = true;
  phone: string;
  @Input() _parent: any;

  constructor(public router:Router, protected urlAdresses: UrlAdresses, public http: HttpClient,protected cookieService: CookieService, public headerService:HeaderService) {
    super(router,urlAdresses,http,cookieService,headerService);
    this.base_url = urlAdresses.base_url;
    this.resetPassword = urlAdresses.resetPassword;
  }

  ngOnInit() {
  }
  remindPassword() {
    console.log(typeof this.phone);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.post(this.base_url+this.resetPassword,{PhoneNumber:this.phone.toString()},{headers:headers})
        .subscribe(res=>{})
  }
  back() {
    this._parent.remind_pass = true;
  }
  closeForm() {
    super.CloseForm();
  }
}
