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
      Comment: new FormControl(),
    })

    http.get(this.base_url+this.getVacancies)
        .subscribe(data=>{
      this.vacancies = data;
      console.log(typeof this.vacancies);
          this.form.controls['IdVacancy'].setValue(this.vacancies[0].Id);
      debugger;
    })

  }

  ngOnInit() {
  }
  sendVacancies(form) {
    let vacancies = 'IdVacancy='+this.form.get('IdVacancy').value+'&Name='+this.form.get('Name').value+'&Surname='+this.form.get('Surname').value+'&PhoneNumber='+this.form.get('PhoneNumber').value+'&Email='+this.form.get('Email').value+'&Comment='+this.form.get('Comment').value;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    // headers = headers.append('x-corralation-id', '12345');
    // headers.append('Content-Type:','application/x-www-form-urlencoded');
    this.http.post(this.base_url+this.sendVacansies,vacancies,{headers:headers})
        .subscribe(res=>{})

    // console.log(this.form,this.id_vacancy,form)
    // debugger;
    // return this.form.controls['IdVacancy'].setValue(item.Id);
  }

}
