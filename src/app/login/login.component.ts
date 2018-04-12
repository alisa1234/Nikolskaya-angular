import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UrlAdresses} from '../url_adresses';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from '../header/header.service';
import 'rxjs/add/operator/filter';

interface IUserLogin {
  access_token: string;
  expires_in: number;
  token_type: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {'class': 'root'}
})

export class LoginComponent implements OnInit {

  base_url: string;
  login_url: string;
  sign_url: string;
  sign_in: boolean = false;
  login: boolean = false;
  phone: string;
  password: number;
  getClientAccount: string;
  getClientAdresses: string;
  result:IUserLogin;
  remind_pass: boolean = true;

  form_sign_in: FormGroup;
  form_log_in: FormGroup;

  constructor(public router:Router, protected urlAdresses: UrlAdresses, public http: HttpClient,protected cookieService: CookieService, public headerService:HeaderService) {

    this.base_url = urlAdresses.base_url;
    this.login_url = urlAdresses.login;
    this.sign_url = urlAdresses.signin;
    this.getClientAccount = urlAdresses.getClientAccount;
    this.getClientAdresses = urlAdresses.getClientAdresses;
    this.sign_in = true;
    this.form_sign_in = new FormGroup({
      Email: new FormControl(),
      PhoneNumber: new FormControl(),
      FirstName: new FormControl(),
      LastName: new FormControl()
    });
    this.form_log_in = new FormGroup({
      PhoneNumber: new FormControl(),
      Password: new FormControl()
    })
  }

  ngOnInit() {}

  LogIn() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    this.http.post<IUserLogin>(this.base_url + this.login_url, this.form_log_in.value, {headers: headers})
        .subscribe(data => {
           this.result = data;
          localStorage.setItem('access_token',this.result.access_token);
          this.cookieService.set('access_token',this.result.access_token);
              headers = headers.append('Authorization',this.result.access_token);

              this.http.get(this.base_url+this.getClientAccount,{headers:headers})
                  .subscribe(res=>{
                      this.headerService.login = true;
                      localStorage.setItem('client_about',JSON.stringify(res));
                      this.headerService.client_about = res;

                      if(this.headerService.current_url == '/bucket'){
                          this.router.navigate(['/order']);
                      } else this.router.navigate(['/personal']);
                  });

                this.http.get(this.base_url+this.getClientAdresses,{headers:headers})
                    .subscribe(data=>{
                        localStorage.setItem('client_adresses',JSON.stringify(data));
                    })
        })
  }

  SignIn() {

    let headers: HttpHeaders = new HttpHeaders();

      this.http.post(this.base_url+this.sign_url,this.form_sign_in.value,{headers:headers})
          .subscribe(res=>{
            this.login = true;
            this.sign_in = false;
          })
  }

  CloseForm() {

      this.router.navigate([this.headerService.current_url]);
  }
}
