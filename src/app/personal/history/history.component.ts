import {Component, OnInit} from '@angular/core';
import {UrlAdresses} from '../../url_adresses';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {
    base_url: string;
    GetClientOrder: string;
    ClientOrdersDetailed: string;

    constructor(private urlAdresses: UrlAdresses, private http: HttpClient) {
        this.base_url = urlAdresses.base_url;
        this.GetClientOrder = urlAdresses.GetClientOrder;
        this.ClientOrdersDetailed = urlAdresses.ClientOrdersDetailed;
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', localStorage.getItem('access_token'));


        this.http.get(this.base_url + this.GetClientOrder + '?Page=1&PageSize=1', {headers: headers})
            .subscribe(res => {
            });
        this.http.get(this.base_url + this.ClientOrdersDetailed, {headers: headers})
            .subscribe(res => {
            });
    }

    ngOnInit() {
    }

}
