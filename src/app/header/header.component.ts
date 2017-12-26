import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  show_language: boolean = false;
  show_menu: boolean;
  current_url: string;
  constructor(private route: Router) {
    this.current_url = this.route.url;
  }

  ngOnInit() {

  }
  selectLanguage() {
    if(this.show_language == true){
      this.show_language = false;
    }else this.show_language = true;

  }
  showMenu() {
    this.show_menu = true;
    $(document.body).css('position','fixed');
  }

}
