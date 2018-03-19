import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UrlAdresses} from '../../url_adresses';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

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

  constructor(private urlAdresses: UrlAdresses, private http: HttpClient) {

    this.base_url = urlAdresses.base_url;
    this.GetStreets = urlAdresses.GetStreets;
    this.AddClientAdress = urlAdresses.AddClientAdress;
    this.form_adresses = new FormGroup ({
      name: new FormControl(),
      // StreetId: new FormControl(),
      // Building: new FormControl(),
      Entry: new FormControl(),
      EntryCode: new FormControl(),
      Floor: new FormControl(),
      Appartaments: new FormControl()

    })

  }

  ngOnInit() {
  }
  GetStreetsId() {
    let headers: HttpHeaders = new HttpHeaders();

    headers = headers.append('Authorization',localStorage.getItem('access_token'));
    // headers = headers.append('Content-Type','application/x-www-form-urlencoded')
    let params = {params: new HttpParams().set('name',this.form_adresses.get('name').value).set('count','10')};
    // let params = this.form_adresses.get('name').value;
    this.http.get(this.base_url+this.GetStreets+'?name='+this.form_adresses.get('name').value+'&count=10',{headers: headers})
        .subscribe(res=>{
        });

  }
  AddAdress() {
    let entry: string = this.form_adresses.get('Entry').value;
    let entryCode: string = this.form_adresses.get('EntryCode').value;
    let floor: string = this.form_adresses.get('Floor').value;
    let appartaments: string = this.form_adresses.get('Appartaments').value;

    this.form_adresses.controls['Entry'].setValue(entry.toString());
    this.form_adresses.controls['EntryCode'].setValue(entryCode.toString());
    this.form_adresses.controls['Floor'].setValue(floor.toString());
    this.form_adresses.controls['Appartaments'].setValue(appartaments.toString());

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization',localStorage.getItem('access_token'));
    this.http.post(this.base_url+this.AddClientAdress,this.form_adresses.value,{headers:headers})
        .subscribe(res=>{
        })
  }
}
