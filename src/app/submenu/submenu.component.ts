import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})

export class SubmenuComponent implements OnInit {

  type_menu: {[index:string]:boolean}={};
  show_submenu: boolean = false;

  constructor() {

    this.type_menu['noodles']=false;
    this.type_menu['burgers']=false;
    this.type_menu['sandwiches']=false;
    this.type_menu['pizza']=false;
    this.type_menu['all']=true;
  }

  ngOnInit() {}

  chooseMenu(type_menu: string) {

    for(let key in this.type_menu) {
      this.type_menu[key]=false;
      this.type_menu[type_menu]=true;
    }
  }

  showSubmenu() {

    this.show_submenu = !this.show_submenu;
  }

}
