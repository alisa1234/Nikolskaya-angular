import {Component, OnInit} from '@angular/core';
import {UrlAdresses} from '../url_adresses';
import {RestaurantsListService} from './restaurants-list.service';

@Component({
    selector: 'app-restaurants-list',
    templateUrl: './restaurants-list.component.html',
    styleUrls: ['./restaurants-list.component.scss']
})

export class RestaurantsListComponent implements OnInit {

    base_url: string;
    getRestaurants_list: string;
    restauants_list: any;
    filter_res_list: any;
    filter: boolean = false;

    constructor(private urlAdresses: UrlAdresses, private restaurantsListService: RestaurantsListService) {

        this.base_url = urlAdresses.base_url;
        this.getRestaurants_list = urlAdresses.getRestaurants_list;
        this.restauants_list = JSON.parse(localStorage.getItem('restaurants_list'));
        if (this.restauants_list == null) {
            this.restaurantsListService.getRestaurantsList();
            this.restaurantsListService.change.subscribe(data => {
                this.restauants_list = data;

            })

        }
        document.body.scrollTop;
    }

    ngOnInit() {
    }

}
