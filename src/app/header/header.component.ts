import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  show_language: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  selectLanguage() {
    if(this.show_language == true){
      this.show_language = false;
    }else this.show_language = true;

  }
}
