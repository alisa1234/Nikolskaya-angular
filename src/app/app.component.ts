import {Component} from '@angular/core';
import {Title}     from '@angular/platform-browser';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UrlAdresses} from './url_adresses';
import {HeaderService} from './header/header.service';
import {RestaurantsListService} from './restaurants-list/restaurants-list.service';
import {OrderService} from "./order.service";

@Component({
    selector: 'app-root',
    template: '<app-header></app-header><div class="mobile_block"><router-outlet (activate)="onActivate()"></router-outlet></div><app-footer></app-footer>',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {

    base_url: string;
    getClientAccount: string;
    getVersionMenu: string;
    access_token: string;
    title: string;

    constructor(private cookieService: CookieService, private http: HttpClient, private urlAdresses: UrlAdresses, public  headerService: HeaderService, public restaurantsListService: RestaurantsListService, private titleService: Title, private router: Router, route: ActivatedRoute, public orderService: OrderService) {

        this.base_url = urlAdresses.base_url;
        this.getClientAccount = urlAdresses.getClientAccount;
        this.getVersionMenu = urlAdresses.getMenuVersion;
        let headers: HttpHeaders = new HttpHeaders();
        this.access_token = this.cookieService.get('access_token');

        if (this.cookieService.get('access_token') != "") {
            headers = headers.append('Authorization', this.access_token);

            this.http.get(this.base_url + this.getClientAccount, {headers: headers})
                .subscribe(res => {
                    localStorage.setItem('client_about', JSON.stringify(res));
                    this.headerService.login = true;
                    this.headerService.client_about = res;
                });
        }
        window.scrollTo(0, 0);

        this.http.get(this.base_url + this.getVersionMenu)
            .subscribe(data => {
                if (localStorage.getItem('version_menu') == null) {
                    localStorage.setItem('version_menu', String(data));
                } else {
                    if (data != localStorage.getItem('version_menu')) {
                        this.restaurantsListService.getRestaurantsList();
                    }
                }

            });

        this.router.events.subscribe(s => {
            if (s instanceof NavigationEnd) {
                if (this.router.url == '/') {
                    this.titleService.setTitle('Вокруг Света');
                } else {
                    this.title = route.root.firstChild.snapshot.data['title'];
                    if (typeof this.title != 'undefined') {
                        this.titleService.setTitle(this.title + ' | Вокруг Света');
                    }
                }
            }
        });
        if(JSON.parse(localStorage.getItem('bucket'))!== null) {
            this.orderService.order_arr_bucket = JSON.parse(localStorage.getItem('bucket'));
            this.orderService.order_arr_bucket_keys = JSON.parse(localStorage.getItem('keys'));
            this.orderService.total_price = JSON.parse(localStorage.getItem('total_price'));

        }


    }

    onActivate() {
        window.scroll(0, 0);
        // this.router.events.subscribe(s => {
        //     if (s instanceof NavigationEnd) {
        //         if (this.router.url == '/restaurants-main/' && this.orderService.arr_bucket_length != 0) {
        //             this.orderService.show_bucket_mob = true;
        //         } else {
        //             this.orderService.show_bucket_mob = false;
        //         }
        //     }
        // });
    }
}
