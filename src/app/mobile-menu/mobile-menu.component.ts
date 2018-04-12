import { Component, OnInit,Input, HostListener } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})

export class MobileMenuComponent implements OnInit {

  @Input() show_menu: boolean = false;
  @Input() _parent;

  constructor() {}

  @HostListener('document:click', ['$event'])

  clickLink(event) {

    if(event.target.closest('.menu_mobile_tabs-main a') || event.target.closest('.menu_mobile_tabs-sub a')|| event.target.closest('.overlay')) {
        this._parent.show_menu = false;
      $(document.body).css('position','');
    }
  }

  ngOnInit() {}

  closeMenu() {

    this.show_menu = false;
    this._parent.show_menu = false;
    $(document.body).css('position','');
  }

}
