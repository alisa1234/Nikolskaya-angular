import {Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from "../order.service";
import {BucketModule} from "../bucket-module";
import {RestaurantsListService} from "../restaurants-list/restaurants-list.service";

@Component({
    selector: 'app-restaurants-main',
    templateUrl: './restaurants-main.component.html',
    styleUrls: ['./restaurants-main.component.scss']
})

export class RestaurantsMainComponent implements OnInit, AfterViewInit {

    restaurant_list: any;
    restaurant_list_current: any;
    restaurant_list_menu: any;
    show_dishes: boolean = false;
    show_bucket: boolean = false;
    restaurant_id: any;
    dishes_arr = [];
    restaurant_name: string;
    quantity: number = 1;
    quantity_price: number;
    total_price: number =0;
    show_bg: boolean = false;
    bucket_height: number = 0;
    scrollPosition: number = 0;
    subs:boolean = false;

    @ViewChild('banner') banner_block: ElementRef;
    @ViewChild('dishesContent') dishes_block: ElementRef;
    @ViewChild('bucketBlock') bucket_block: ElementRef;
    @ViewChild('bucketItem') bucket_item: ElementRef;
    @ViewChild('blockWrapper') block_wrapper: ElementRef;

    constructor(private route: ActivatedRoute, public orderService: OrderService, private router:Router, private bucketModule:BucketModule, private restaurantsListService:RestaurantsListService) {

        this.restaurant_list = JSON.parse(localStorage.getItem('restaurants_list'));

        this.route.params.subscribe(params => {
            this.restaurant_id = +params['id'];
        });

        for (let number in this.restaurant_list) {
            if (this.restaurant_list[number].Number == this.restaurant_id) {
                this.restaurant_list_current = this.restaurant_list[number];
                this.restaurant_list_menu = this.restaurant_list[number].RestaurantCategories;
                this.restaurant_name = this.restaurant_list[number].Name;
            }
        }

        if(this.orderService.order_arr.length!=0) {
            this.dishes_arr = this.orderService.order_arr.slice(0);
            this.total_price = this.orderService.total_price;
            this.show_bucket = true;
        }
    }

    @HostListener('window:scroll', ['$event'])
    onWindowsScroll(event) {
        let banner = this.banner_block;
        let dishes = this.dishes_block;
        let bucket = this.bucket_block;
        let offset = event.currentTarget.pageYOffset;
        this.scrollPosition = offset;
        const dishesRect = dishes.nativeElement.getBoundingClientRect();
        let docWidth = document.body.clientWidth;
        let posWidth = ((window.innerWidth-docWidth)/2) + 50;

        if(!this.show_bucket) {


            const rect = banner.nativeElement.getBoundingClientRect();

            if (offset > 598 && offset < (dishesRect.height - rect.height)) {
                if(window.innerWidth<1180&&window.innerWidth>1023) {

                    let blockArr = document.getElementsByClassName('dishes_content_menu_blocks_wrapper');
                    for(let i=0;i<blockArr.length;i++) {
                        document.getElementById(blockArr[i].id).style.width = (docWidth - this.banner_block.nativeElement.offsetWidth) - 40 + 'px';
                    }
                }
                let bannerStyle = this.banner_block.nativeElement.style;
                bannerStyle.position = 'fixed';
                bannerStyle.right = posWidth+'px';
                bannerStyle.top = '20px';
            } else {
                if(window.innerWidth<1180&&window.innerWidth>1023) {

                    let blockArr = document.getElementsByClassName('dishes_content_menu_blocks_wrapper');
                    for(let i=0;i<blockArr.length;i++) {
                        document.getElementById(blockArr[i].id).style.width = (docWidth - this.banner_block.nativeElement.offsetWidth) - 40 + 'px';
                    }
                }
                if (offset > (dishesRect.height - rect.height)) {
                    let bannerStyle = this.banner_block.nativeElement.style;
                    bannerStyle.position = 'absolute';
                    bannerStyle.right = '40px';
                    bannerStyle.top = String(dishesRect.height - rect.height - 20) + 'px';
                } else {
                    let bannerStyle = this.banner_block.nativeElement.style;
                    bannerStyle.position = 'absolute';
                    bannerStyle.right = '40px';
                    bannerStyle.top = '120px';
                }

            }


        } else {

            const bucketRect = bucket.nativeElement.getBoundingClientRect();

            if (offset > 598 && offset < (dishesRect.height - bucketRect.height)) {

                let bucketStyle = this.bucket_block.nativeElement.style;
                bucketStyle.position = 'fixed';
                bucketStyle.right = posWidth+'px';
                bucketStyle.top = '20px';
            } else {

                if (offset > (dishesRect.height - bucketRect.height)) {
                    let bucketStyle = this.bucket_block.nativeElement.style;
                    bucketStyle.position = 'absolute';
                    bucketStyle.right = '40px';
                    bucketStyle.top = String(dishesRect.height - bucketRect.height) + 'px';
                } else {
                    if(window.innerWidth<1180&&window.innerWidth>1023) {

                        let blockArr = document.getElementsByClassName('dishes_content_menu_blocks_wrapper');
                        for(let i=0;i<blockArr.length;i++) {
                            document.getElementById(blockArr[i].id).style.width = (docWidth - this.bucket_block.nativeElement.offsetWidth) - 40 + 'px';
                        }
                    }
                    let bucketStyle = this.bucket_block.nativeElement.style;
                    bucketStyle.position = 'absolute';
                    bucketStyle.right = '50px';
                    bucketStyle.top = '120px';
                    bucketStyle.width = '100%';
                }
            }
        }
    }

    bindBucketOnScreen() {

      setTimeout(()=>{
          let bucketStyle = this.bucket_block.nativeElement.style;

          if(this.scrollPosition < 500) {
              bucketStyle.position = 'absolute';
              bucketStyle.right = '40px';
              bucketStyle.top = '120px';
          } else {
              bucketStyle.position = 'fixed';
              bucketStyle.right = '50px';
              bucketStyle.top = '20px';
          }

          this.restaurantsListService.bucket_height = this.bucket_block.nativeElement.clientHeight;
      },1)
    }

    goToCategory(category_id) {
        this.route.fragment.subscribe(f => {
            let element = document.querySelector("#cat_" + category_id);

            if (element != null) {
                element.scrollIntoView();
            }
        });
    }

    ngOnInit() {}

    ngAfterViewInit() {

        if(this.orderService.order_arr.length!=0) {

            this.bucket_height = this.restaurantsListService.bucket_height;
            this.getBucketHeight();
        }
    }

    showDishes() {

        if (this.show_dishes == true) {
            this.show_dishes = false;
        } else this.show_dishes = true;
    }

    addItem(id: number) {

        let result = this.bucketModule.addItem(id,this.dishes_arr,this.total_price);
        this.dishes_arr = result.arr;
        this.total_price = result.total;
        this.orderService.total_price = result.total;
        this.orderService.order_arr = result.arr.slice(0);
    }

    removeItem(id) {

        let result = this.bucketModule.removeItem(id,this.dishes_arr,this.total_price, this.bucket_item);
        this.dishes_arr = result.arr;
        this.total_price = result.total;
    }

    addOrder() {

        this.orderService.total_price = this.total_price;
        this.router.navigate(["/bucket"]);
    }

    getBucketHeight() {

        let bucket = this.bucket_block;
        let windowHeight = (window.innerHeight);
        let height;

        if(this.bucket_height == 0) {
             height = bucket.nativeElement.clientHeight;
            this.restaurantsListService.bucket_height = bucket.nativeElement.clientHeight;
         }else height = this.bucket_height;

        if(height > windowHeight) {
            windowHeight = windowHeight - 40;
            let itemsHeight = windowHeight - 162;
            bucket.nativeElement.style.height = windowHeight+'px';
            bucket.nativeElement.children[1].style.height = itemsHeight+'px';
            bucket.nativeElement.children[1].style.overflowY = 'scroll';
            bucket.nativeElement.style.width=260+'px';
            this.subs=true;
        }
    }

    scroll() {

        this.subs=false;
    }

}
