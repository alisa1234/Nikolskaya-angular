import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { HeaderService } from './header.service';
import {OrderService} from "../order.service";
declare let $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  show_language: boolean = false;
  show_menu: boolean;
  open_search: boolean;
  client_about: Object;
  hover:boolean = false;

  constructor(private route: Router, private router: ActivatedRoute, public headerService:HeaderService, public orderService:OrderService) {
    this.orderService = orderService;
    this.route.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = this.route.parseUrl(this.route.url);
      }
    });
  }

  ngOnInit() {}

  showMenu() {
    this.show_menu = true;
    $(document.body).css('position','fixed');
  }

  goToMap() {

    if(this.route.url == '/'){
      this.router.fragment.subscribe ( f => {
        let element = document.querySelector ( "#map");
        if(element != null ){
          element.scrollIntoView ()
        }
      });
    } else {
      this.route.navigate(['/contacts']).then(()=> this.router.fragment.subscribe ( f => {
        let element = document.querySelector ( "#map_contacts");
        if(element != null ){
          element.scrollIntoView ()
          }
      }));
    }
  }

  ShowLoginForm() {
    this.headerService.getUrl(this.route.url);
    this.route.navigate(['/login']);
  }
  openBusket() {
    this.orderService.show_bucket_mob_other = false;
  }

}
