import { Component, OnInit } from '@angular/core';
import { UrlAdresses } from '../../url_adresses';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-about-vacancies',
  templateUrl: './about-vacancies.component.html',
  styleUrls: ['./about-vacancies.component.scss']
})
export class AboutVacanciesComponent implements OnInit {

  base_url: string;
  getVacancies: string;
  sendVacansies: string;
  vacancies: any;
  id_vacancy: number;
  form: FormGroup;

  constructor(private urlAdresses: UrlAdresses, private http: HttpClient) {

    this.base_url = urlAdresses.base_url;
    this.getVacancies = urlAdresses.getVacancies;
    this.sendVacansies = urlAdresses.sendVacansies;
    this.form = new FormGroup({
      IdVacancy: new FormControl(),
      Name: new FormControl(),
      Surname: new FormControl(),
      PhoneNumber: new FormControl(),
      Email: new FormControl(),
      FileName: new FormControl(),
      FileBytes: new FormControl(),
      Comment: new FormControl()
    });

    http.get(this.base_url+this.getVacancies)
        .subscribe(data=>{
          this.vacancies = data;
          this.form.controls['IdVacancy'].setValue(this.vacancies[0].Id);
    })
  }

  ngOnInit() {}

  sendVacancies() {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization',localStorage.getItem('access_token'));
    headers = headers.append('Content-Type', 'application/json');

    this.http.post(this.base_url+this.sendVacansies,this.form.value,{headers:headers})
        .subscribe(res=>{})
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('FileBytes').setValue(reader.result.split(',')[1]);
        this.form.get('FileName').setValue(file.name);
      }
    }
  }
}
