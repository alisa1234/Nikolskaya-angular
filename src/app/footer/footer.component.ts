import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import {OrderService} from "../order.service";
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

  @ViewChild('banner') banner_block: ElementRef;

  constructor(public orderService:OrderService,private route: Router,) { }

  ngOnInit() {}

  @HostListener('window:scroll', ['$event'])
  onWindowsScroll(event) {
    let offsetX = document.body.clientWidth;
    if(offsetX<1023&&!this.orderService.show_bucket_mob){
      let banner = this.banner_block.nativeElement.style;
      banner.position = 'fixed';
      banner.bottom = '0';
    }
  }
  openBusket() {
    $(document.body).css({overflow: 'hidden'});
    let offsetX = document.body.clientWidth;
    if (offsetX<1024) {
      $(document.body).css({position: 'fixed'});
    }
    $('.busket_mob').css('display','block')
  }

}
