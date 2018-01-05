import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
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
  open_search: boolean;
  constructor(private route: Router, private router: ActivatedRoute) {
    this.current_url = this.route.url;

    this.route.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = this.route.parseUrl(this.route.url);
      }

    });

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
  goToMap() {
    if(this.route.url == '/'){
      this.router.fragment.subscribe ( f => {
        let element = document.querySelector ( "#map");
        if(element != null ){
          element.scrollIntoView ()
        }
      });
    }else{
      this.route.navigate(['/contacts']).then(()=> this.router.fragment.subscribe ( f => {
          let element = document.querySelector ( "#map_contacts");
        if(element != null ){
          element.scrollIntoView ()
        }

      }));

    }

  }
  openSearch() {
    this.open_search = true;
  }
}
