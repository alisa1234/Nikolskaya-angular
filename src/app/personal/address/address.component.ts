import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {UrlAdresses} from '../../url_adresses';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-adress',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss']
})

export class AddressComponent implements OnInit {

    base_url: string;
    GetStreets: string;
    AddClientAdress: string;
    form_adresses: FormGroup;
    street_id = {Name: '', Count: '10'};
    adresses_arr = [];
    client_adresses_arr;
    name: string;

    constructor(private urlAdresses: UrlAdresses, private http: HttpClient) {

        this.base_url = urlAdresses.base_url;
        this.GetStreets = urlAdresses.GetStreets;
        this.AddClientAdress = urlAdresses.AddClientAdress;
        this.form_adresses = new FormGroup({
            StreetId: new FormControl(),
            Building: new FormControl(),
            Entry: new FormControl(),
            EntryCode: new FormControl(),
            Floor: new FormControl(),
            Appartaments: new FormControl(),
            BuildingNumber: new FormControl(),
            BuildingAppartment: new FormControl(),

        });
        this.client_adresses_arr = JSON.parse(localStorage.getItem('client_adresses'));
    }

    ngOnInit() {
    }

    GetStreetsId() {

        let headers: HttpHeaders = new HttpHeaders();
        this.street_id.Name = this.name;
        headers = headers.append('Authorization', localStorage.getItem('access_token'));
        headers = headers.append('Content-Type', 'application/json');

        this.http.post(this.base_url + this.GetStreets, this.street_id, {headers: headers})
            .subscribe(res => {
                for (let key in res) {
                    this.adresses_arr.push(res[key]);
                }
            });
    }

    AddAdress() {

        let entry: string = this.form_adresses.get('Entry').value;
        let entryCode: string = this.form_adresses.get('EntryCode').value;
        let floor: string = this.form_adresses.get('Floor').value;
        let appartaments: string = this.form_adresses.get('Appartaments').value;

        this.form_adresses.controls['Entry'].setValue(entry);
        this.form_adresses.controls['EntryCode'].setValue(entryCode);
        this.form_adresses.controls['Floor'].setValue(floor.toString());
        this.form_adresses.controls['Appartaments'].setValue(appartaments);

        this.adresses_arr.map(index => {
            if (index.Name === this.name) {
                this.form_adresses.controls['StreetId'].setValue(index.Id);
            }
        });

        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', localStorage.getItem('access_token'));

        this.http.post(this.base_url + this.AddClientAdress, this.form_adresses.value, {headers: headers})
            .subscribe(res => {
            })
    }

}
