import { Component, OnInit } from '@angular/core';
import {UrlAdresses} from "../../url_adresses";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-about-concept',
  templateUrl: './about-concept.component.html',
  styleUrls: ['./about-concept.component.scss'],
  host:{'class':'root'}
})
export class AboutConceptComponent implements OnInit {

  base_url: string;
  getAbout: string;
  about_title: string;
  about_text: string;

  constructor(private http: HttpClient, private urlAdresses:UrlAdresses) {
    this.base_url = urlAdresses.base_url;
    this.getAbout =  urlAdresses.getAbout;
    this.http.get(this.base_url+this.getAbout)
        .subscribe(data=>{
          this.about_title = data[0].Header;
          this.about_text = data[0].Body;
          debugger;
        })
  }

  ngOnInit() {
  }


}
