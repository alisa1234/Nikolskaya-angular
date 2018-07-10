import {Component, OnInit, HostListener} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {UrlAdresses} from '../url_adresses';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HeaderService} from '../header/header.service';
import 'rxjs/add/operator/filter';

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
    sign_in_step2: boolean = false;
    login: boolean = false;
    login_step2: boolean = false;
    phone: string;
    password: number;
    getClientAccount: string;
    getClientAdresses: string;
    GetSmsToken: string;
    changePersonal: string;
    result: any;
    remind_pass: boolean = true;

    form_sign_in: FormGroup;
    form_sign_in_step2: FormGroup;
    form_log_in: FormGroup;
    form_log_in_step2: FormGroup;

    constructor(public router: Router, protected urlAdresses: UrlAdresses, public http: HttpClient, protected cookieService: CookieService, public headerService: HeaderService) {

        this.base_url = urlAdresses.base_url;
        this.login_url = urlAdresses.login;
        this.sign_url = urlAdresses.signin;
        this.GetSmsToken = urlAdresses.GetSmsToken;
        this.getClientAccount = urlAdresses.getClientAccount;
        this.getClientAdresses = urlAdresses.getClientAdresses;
        this.changePersonal = urlAdresses.changePersonal;
        this.sign_in = true;
        this.form_sign_in = new FormGroup({
            PhoneNumber: new FormControl(),
            FirstName: new FormControl(),
        });
        this.form_sign_in_step2 = new FormGroup({
            Password: new FormControl(),
        });
        this.form_log_in = new FormGroup({
            PhoneNumber: new FormControl()
        });
        this.form_log_in_step2 = new FormGroup({
            Password: new FormControl(),
            PhoneNumber: new FormControl(),
        })
    }

    @HostListener('document:click', ['$event'])

    clickout(event) {

        if (event.target.closest('.form_wrapper') || event.target.closest('.header_tabs_login')) {
        } else {
            this.router.navigate([this.headerService.current_url]);
        }
    }

    ngOnInit() {
    }

    LogIn() {

        let headers: HttpHeaders = new HttpHeaders();
        let phone = this.form_log_in.get('PhoneNumber').value;
        this.form_log_in_step2.setValue({Password: '', PhoneNumber: phone});

        this.http.get(this.base_url + this.GetSmsToken + '?phoneNumber=' + phone)
            .subscribe(data => {
                this.result = data;
                this.login_step2 = true;
                this.login = false;
                // localStorage.setItem('access_token',this.result.access_token);
                // this.cookieService.set('access_token',this.result.access_token);
                //     headers = headers.append('Authorization',this.result.access_token);


                // this.http.get(this.base_url+this.getClientAccount,{headers:headers})
                //     .subscribe(res=>{
                //         this.headerService.login = true;
                //         localStorage.setItem('client_about',JSON.stringify(res));
                //         this.headerService.client_about = res;
                //
                //         if(this.headerService.current_url == '/bucket'){
                //             this.router.navigate(['/order']);
                //         } else this.router.navigate(['/personal']);
                //     });
                //
                //   this.http.get(this.base_url+this.getClientAdresses,{headers:headers})
                //       .subscribe(data=>{
                //           localStorage.setItem('client_adresses',JSON.stringify(data));
                //       })
            })
    }

    SignIn() {

        let headers: HttpHeaders = new HttpHeaders();

        this.http.post(this.base_url + this.sign_url, this.form_sign_in.value, {headers: headers})
            .subscribe(res => {
                this.sign_in_step2 = true;
                this.sign_in = false;

            })
    }

    SignIn_step2() {
        let headers: HttpHeaders = new HttpHeaders();
        this.http.post(this.base_url + this.changePersonal, this.form_sign_in_step2.value, {headers: headers})
            .subscribe(res => {

            })

    }

    LogIn_step2() {
        let headers: HttpHeaders = new HttpHeaders();
        this.http.post(this.base_url + this.login_url, this.form_log_in_step2.value, {headers: headers})
            .subscribe(res => {
                this.result = res;
                localStorage.setItem('access_token', this.result.access_token);
                this.cookieService.set('access_token', this.result.access_token);
                headers = headers.append('Authorization', this.result.access_token);


                this.http.get(this.base_url + this.getClientAccount, {headers: headers})
                    .subscribe(res => {
                        this.headerService.login = true;
                        localStorage.setItem('client_about', JSON.stringify(res));
                        this.headerService.client_about = res;

                        if (this.headerService.current_url == '/bucket') {
                            this.router.navigate(['/order']);
                        } else this.router.navigate(['/personal']);
                    });

                this.http.get(this.base_url + this.getClientAdresses, {headers: headers})
                    .subscribe(data => {
                        localStorage.setItem('client_adresses', JSON.stringify(data));
                    })

            })
    }

    CloseForm() {

        this.router.navigate([this.headerService.current_url]);
    }
}
