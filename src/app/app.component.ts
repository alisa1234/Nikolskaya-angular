import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlAdresses} from './url_adresses';
import {HeaderService} from './header/header.service';

@Component({
  selector: 'app-root',
  template: '<app-header></app-header><div class="mobile_block"><router-outlet></router-outlet></div><app-footer></app-footer>',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  base_url: string;
  getClientAccount: string;
  access_token: string;

  constructor (private cookieService: CookieService,private http: HttpClient,private urlAdresses: UrlAdresses, public  headerService:HeaderService) {

    this.base_url = urlAdresses.base_url;
    this.getClientAccount = urlAdresses.getClientAccount;
    let headers: HttpHeaders = new HttpHeaders();
    this.access_token = this.cookieService.get('access_token');

    if(this.cookieService.get('access_token') != "") {
      headers = headers.append('Authorization',this.access_token);

      this.http.get(this.base_url+this.getClientAccount,{headers:headers})
          .subscribe(res=>{
            localStorage.setItem('client_about',JSON.stringify(res));
            this.headerService.login = true;
            this.headerService.client_about = res;
          });
    }
  }
}
