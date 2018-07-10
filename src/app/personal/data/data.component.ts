import {Component, OnInit} from '@angular/core';
import {PersonalService} from '../personal.service';
import {UrlAdresses} from '../../url_adresses';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.scss']
})

export class DataComponent implements OnInit {
    base_url: string;
    changePassword: string;
    changePersonal: string;
    last_name: string;
    first_name: string;
    email: string;

    form_personal: FormGroup;
    form_password: FormGroup;

    constructor(private personalService: PersonalService, private urlAdresses: UrlAdresses, private http: HttpClient) {

        this.base_url = urlAdresses.base_url;
        this.changePassword = urlAdresses.changePassword;
        this.changePersonal = urlAdresses.changePersonal;

        this.form_personal = new FormGroup({
            FirstName: new FormControl(),
            LastName: new FormControl(),
            Email: new FormControl()
        });

        this.form_password = new FormGroup({
            OldPassword: new FormControl(),
            NewPassword: new FormControl(),
            ConfirmPassword: new FormControl()
        })

    }

    ngOnInit() {

        this.first_name = this.personalService.client_data.FirstName;
        this.last_name = this.personalService.client_data.LastName;
    }

    changePass() {

        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', localStorage.getItem('access_token'));

        this.http.put(this.base_url + this.changePassword, this.form_password.value, {headers: headers})
            .subscribe(res => {
            })
    }

    changeData() {

        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', localStorage.getItem('access_token'));

        this.http.post(this.base_url + this.changePersonal, this.form_personal.value, {headers: headers})
            .subscribe(res => {
            })
    }

}
