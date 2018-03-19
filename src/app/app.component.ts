import { Component } from '@angular/core';
import {RouterLinkActive, Router, NavigationEnd, ActivatedRoute,NavigationStart} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlAdresses} from './url_adresses';
import {HeaderService} from './header/header.service';
// declare let $: any;

@Component({
  selector: 'app-root',
  template: '<app-header></app-header><div class="mobile_block"><router-outlet></router-outlet><app-footer></app-footer></div>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  base_url: string;
  getClientAccount: string;
  access_token: string;

  constructor (public router:Router,private cookieService: CookieService,private http: HttpClient,private urlAdresses: UrlAdresses, public  headerService:HeaderService) {
    this.base_url = urlAdresses.base_url;
    this.getClientAccount = urlAdresses.getClientAccount;
    let headers: HttpHeaders = new HttpHeaders();
    this.access_token = this.cookieService.get('access_token');
    debugger;
    if(this.cookieService.get('access_token') != "") {
      this.headerService.login = true;
      debugger;
      headers = headers.append('Authorization',this.access_token);
      this.http.get(this.base_url+this.getClientAccount,{headers:headers})
          .subscribe(res=>{
            localStorage.setItem('client_about',JSON.stringify(res))
            // debugger;
          });
    }else {
      debugger;
    }


    // this.router.events.subscribe(s => {
    //   debugger;
    //   if (s instanceof NavigationEnd) {
    //     const tree = this.router.parseUrl(this.router.url);
    //     let previous = s.url;
    //     debugger;
    //   }
    //
    // });
    // this.router.events.pairwise().subscribe((e) => {
    //   console.log(e);
    // });
  }
}
