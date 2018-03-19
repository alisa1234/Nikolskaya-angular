import { Component, OnInit } from '@angular/core';
import {UrlAdresses} from '../../url_adresses';

@Component({
  selector: 'app-about-news',
  templateUrl: './about-news.component.html',
  styleUrls: ['./about-news.component.scss']
})
export class AboutNewsComponent implements OnInit {
  base_url:string;
  getEvents_list:string;

  constructor(private urlAdresses:UrlAdresses) { }

  ngOnInit() {
  }

}
