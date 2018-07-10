import {Injectable} from '@angular/core';
import {UrlAdresses} from '../url_adresses';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class OrderFormService {
    base_url: string;
    getClientAdresses: string;
    adresses_arr = [];
    add_new_adress: boolean = false;

    constructor(private urlAdresses: UrlAdresses, private http: HttpClient) {

        this.base_url = urlAdresses.base_url;
        this.getClientAdresses = urlAdresses.getClientAdresses;
        this.adresses_arr = JSON.parse(localStorage.getItem('client_adresses'));

    }

    UpdateAdresses() {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', localStorage.getItem('access_token'));
        this.http.get(this.base_url + this.getClientAdresses, {headers: headers})
            .subscribe(data => {
                localStorage.setItem('client_adresses', JSON.stringify(data));
                this.adresses_arr = JSON.parse(localStorage.getItem('client_adresses'));
            })
    }

}