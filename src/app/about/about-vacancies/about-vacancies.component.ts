import {Component, OnInit} from '@angular/core';
import {UrlAdresses} from '../../url_adresses';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormGroup, FormControl, Validators} from '@angular/forms';

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
    error_text: { [index: string]: string } = {};
    error: { [index: string]: boolean } = {};
    IdVacancy: FormControl;
    Name: FormControl;
    Surname: FormControl;
    PhoneNumber: FormControl;
    Email: FormControl;
    FileName: FormControl;
    FileBytes: FormControl;
    Comment: FormControl;

    constructor(private urlAdresses: UrlAdresses, private http: HttpClient) {

        this.base_url = urlAdresses.base_url;
        this.getVacancies = urlAdresses.getVacancies;
        this.sendVacansies = urlAdresses.sendVacansies;
        this.error['PhoneNumber'] = false;
        this.error['Email'] = false;
        this.error['Comment'] = false;
        this.error['Resume'] = false;

        http.get(this.base_url + this.getVacancies)
            .subscribe(data => {
                this.vacancies = data;
                this.form.controls['IdVacancy'].setValue(this.vacancies[0].Id);
            })
    }

    ngOnInit() {
        this.createControls();
        this.createForm();
    }

    createControls() {
        this.Name = new FormControl('', [
            Validators.required,
        ]);
        this.Email = new FormControl('', [
            Validators.required,
        ]);
        this.IdVacancy = new FormControl('');
        this.Surname = new FormControl('', [
            Validators.required,
        ]);
        this.PhoneNumber = new FormControl('', [
            Validators.required,
        ]);
        this.FileName = new FormControl();
        this.FileBytes = new FormControl();
        this.Comment = new FormControl();
    }

    createForm() {
        this.form = new FormGroup({
            Name: this.Name,
            Email: this.Email,
            Surname: this.Surname,
            IdVacancy: this.IdVacancy,
            PhoneNumber: this.PhoneNumber,
            FileName: this.FileName,
            FileBytes: this.FileBytes,
            Comment: this.Comment,
        })
    }

    sendVacancies() {
        let headers: HttpHeaders = new HttpHeaders();
        // headers = headers.append('Authorization',localStorage.getItem('access_token'));
        headers = headers.append('Content-Type', 'application/json');
        this.http.post(this.base_url + this.sendVacansies, this.form.value, {headers: headers})
            .subscribe(res => {

                },
                error => {
                    for (let key in error.error.Messages) {
                        for (let field in this.error) {
                            if (key == field) {
                                this.error[field] = false;
                                this.error[key] = true;
                                this.error_text[key] = error.error.Messages[key];
                            }
                        }


                    }
                })
    }

    onFileChange(event) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.form.get('FileBytes').setValue(reader.result.split(',')[1]);
                this.form.get('FileName').setValue(file.name);
            }
        }
    }
}
