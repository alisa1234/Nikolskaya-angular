import { Component, OnInit,Input, DoCheck, HostListener, ElementRef, ViewChild } from '@angular/core';
import { RouterLinkActive, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {

  @Input() show_menu: boolean = false;
  @Input() _parent;
  current_url: string;



  constructor(private routes:ActivatedRoute, private route: Router, public eRef: ElementRef) {
  }
  @ViewChild('menu_mobile') elRef:ElementRef;
  @HostListener('document:click', ['$event'])

  clickLink(event) {
    if(event.target.closest('.menu_mobile_tabs-main a') || event.target.closest('.menu_mobile_tabs-sub a')|| event.target.closest('.overlay')) {
        this._parent.show_menu = false;
      $(document.body).css('position','');
    }else {}
  }
  ngOnInit() {

  }

  closeMenu() {
    this.show_menu = false;
    this._parent.show_menu = false;
    $(document.body).css('position','');
  }

}
