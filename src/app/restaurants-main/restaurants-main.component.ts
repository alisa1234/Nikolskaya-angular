import {Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild, Renderer} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from "../order.service";
import {BucketModule} from "../bucket-module";
import {RestaurantsListService} from "../restaurants-list/restaurants-list.service";
import {Title}  from '@angular/platform-browser';
declare let $: any;


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

    open_modifiers: boolean = false;
    restaurant_id: any;
    dishes_arr = [];
    restaurant_name: string;
    quantity: number = 1;
    quantity_price: number;
    total_price: number = 0;
    show_bg: boolean = false;
    other_rest: boolean = false;
    bucket_height: number = 0;
    scrollPosition: number = 0;
    subs: boolean = false;
    quantity_last: { [index: string]: number } = {};
    in_bucket: { [index: string]: boolean } = {};
    to_cregory: { [index: string]: boolean } = {};
    scroll_to: string;
    necessarily: boolean = false;
    modifiers = [];
    modifiers_selected = [];
    max_selected_modifiers: number;
    min_selected_modifiers: number;
    disable: boolean = true;
    values = [];
    arr_bucket_length: number = 0;

    @ViewChild('banner') banner_block: ElementRef;
    @ViewChild('dishesContent') dishes_block: ElementRef;
    @ViewChild('bucketBlock') bucket_block: ElementRef;
    @ViewChild('bucketItem') bucket_item: ElementRef;
    @ViewChild('bucketItemOther') bucketItemOther: ElementRef;
    @ViewChild('submenu') submenu_block: ElementRef;
    @ViewChild('dishes_dropdown') dishes_dropdown: ElementRef;
    @ViewChild('submenuDropdawn') submenu_dropdawn: ElementRef;
    @ViewChild('share_btn_fb', {read: ElementRef}) share_btn_fb: ElementRef;
    @ViewChild('share_btn_vk', {read: ElementRef}) share_btn_vk: ElementRef;
    @ViewChild('share_btn_tw', {read: ElementRef}) share_btn_tw: ElementRef;
    @ViewChild('share_btn_email', {read: ElementRef}) share_btn_email: ElementRef;
    leftNavDisabled = true;
    rightNavDisabled = false;

    constructor(protected route: ActivatedRoute, public orderService: OrderService, protected router: Router, protected bucketModule: BucketModule, protected restaurantsListService: RestaurantsListService, public renderer: Renderer, protected titleService: Title) {

        this.restaurant_list = JSON.parse(localStorage.getItem('restaurants_list'));
        this.orderService.dishes_arr = this.dishes_arr;

        this.orderService.arr_bucket_length = this.arr_bucket_length;

        this.route.params.subscribe(params => {
            this.restaurant_id = +params['id'];
        });

        for (let number in this.restaurant_list) {
            if (this.restaurant_list[number].Number == this.restaurant_id) {
                this.restaurant_list_current = this.restaurant_list[number];
                this.restaurant_list_menu = this.restaurant_list[number].RestaurantCategories;
                this.restaurant_name = this.restaurant_list[number].Name;
                this.restaurant_list_menu.forEach((item, i) => {
                    this.to_cregory[item.Number] = false;
                })

            }
        }

        if (this.orderService.order_arr_bucket_keys.length != 0) {
            this.dishes_arr = this.orderService.order_arr.slice(0);
            this.total_price = this.orderService.total_price;
            this.show_bucket = true;
            this.orderService.other_rest = this.other_rest;
            for (let restorant in this.orderService.order_arr_bucket) {
                this.arr_bucket_length += this.orderService.order_arr_bucket[restorant].items.length;
                this.orderService.arr_bucket_length = this.arr_bucket_length;
            }
            for (let rest in this.orderService.order_arr_bucket) {
                if (this.orderService.order_arr_bucket[rest].items.length == 0) {
                    delete this.orderService.order_arr_bucket[rest];
                    this.orderService.order_arr_bucket_keys.forEach((item, i) => {
                        if (item == rest) {
                            this.orderService.order_arr_bucket_keys.splice(i, 1);
                        }
                    })
                }

            }
        }
        this.titleService.setTitle(this.restaurant_name + ' | Вокруг Света');
        window.scroll(0, 0);
    }

    leftBoundStat(reachesLeftBound: boolean) {
        this.leftNavDisabled = reachesLeftBound;
    }

    rightBoundStat(reachesRightBound: boolean) {
        this.rightNavDisabled = reachesRightBound;
    }

    @HostListener('window:scroll', ['$event'])
    onWindowsScroll(event, current_target) {
        let banner = this.banner_block;
        let dishes = this.dishes_block;
        let bucket = this.bucket_block;
        let submenu = this.submenu_block;
        let offset = event.currentTarget.pageYOffset;
        let offsetX = document.body.clientWidth;
        let clientHeight = document.documentElement.clientHeight;

        this.scrollPosition = offset;
        const dishesRect = dishes.nativeElement.getBoundingClientRect();

        let docWidth = document.body.clientWidth;
        let posWidth = ((window.innerWidth - docWidth) / 2) + 50;
        if (offsetX < 1270) {
            posWidth = ((window.innerWidth - docWidth) / 2) + 40;
        }

        if (offsetX < 768) {

            if (offset > 227) {
                let submenuStyle = this.submenu_block.nativeElement.style;
                submenuStyle.position = 'fixed';
                submenuStyle.top = '0';
                submenuStyle.width = '100%';
                submenuStyle.zIndex = '9';
                submenuStyle.backgroundColor = '#FFFFFF';

                let children = this.dishes_dropdown.nativeElement.children;
                let currentIndex;
                this.restaurant_list_menu.forEach((item, index) => {

                    let element = document.getElementById("cat_" + item.Number);

                    let sum: number = 0;

                    let elementBound = element.offsetTop + 290;
                    if (offset >= elementBound) {

                        if (index == 0) {
                            this.renderer.setElementClass(this.dishes_dropdown.nativeElement.children[0].children[0], 'active', true);
                        } else {
                            this.renderer.setElementClass(this.dishes_dropdown.nativeElement.children[0].children[0], 'active', false);
                        }

                        for (let key in this.to_cregory) {
                            this.to_cregory[key] = false;
                            this.to_cregory[item.Number] = true;
                        }
                        for (let i = 0; i < children.length; i++) {
                            sum += children[i].clientWidth;
                            if (children[i].children[0].className == 'active' && sum > this.submenu_dropdawn.nativeElement.clientWidth) {
                                this.submenu_dropdawn.nativeElement.scrollTo(sum - children[i].clientWidth, 0)
                            } else if (sum < this.submenu_dropdawn.nativeElement.clientWidth) {
                                this.submenu_dropdawn.nativeElement.scrollTo(0, 0)
                            }

                        }
                    }
                })
            }
            else {
                this.renderer.setElementClass(this.dishes_dropdown.nativeElement.children[0].children[0], 'active', true);
                let submenuStyle = this.submenu_block.nativeElement.style;
                submenuStyle.position = 'absolute';
                submenuStyle.zIndex = '8';
                submenuStyle.top = '';
                submenuStyle.width = '';
            }
        } else if (offsetX == 768) {
            if (offset > 212) {
                let submenuStyle = this.submenu_block.nativeElement.style;
                submenuStyle.position = 'fixed';
                submenuStyle.top = '0';
                submenuStyle.width = '100%';
                submenuStyle.zIndex = '9';
                submenuStyle.backgroundColor = '#FFFFFF';
            }
            else {
                this.renderer.setElementClass(this.dishes_dropdown.nativeElement.children[0].children[0], 'active', true);
                let submenuStyle = this.submenu_block.nativeElement.style;
                submenuStyle.position = 'absolute';
                submenuStyle.zIndex = '8';
                submenuStyle.top = '';
                submenuStyle.width = '';
            }
        }
        else {
            if (offset > 380) {
                let submenuStyle = this.submenu_block.nativeElement.style;
                submenuStyle.position = 'fixed';
                submenuStyle.top = '0';
                submenuStyle.width = '100%';
                submenuStyle.zIndex = '9';
                submenuStyle.backgroundColor = '#FFFFFF';
                if (offsetX < 768) {
                }
                let i = 0;
                let allWidth = 0;
                let prevElem = 0;
                let children = this.dishes_dropdown.nativeElement.children;
                let currentIndex;
                this.restaurant_list_menu.forEach((item, index) => {

                    let element = document.getElementById("cat_" + item.Number);
                    let elementBound = element.offsetTop + 300;


                    if (offsetX < 768) {
                        currentIndex = 4;
                        let sum: number = 0;

                        let elementBound = element.offsetTop + 290;
                        if (offset >= elementBound) {

                            if (index == 0) {
                                this.renderer.setElementClass(this.dishes_dropdown.nativeElement.children[0].children[0], 'active', true);
                            } else {
                                this.renderer.setElementClass(this.dishes_dropdown.nativeElement.children[0].children[0], 'active', false);
                            }

                            for (let key in this.to_cregory) {
                                this.to_cregory[key] = false;
                                this.to_cregory[item.Number] = true;
                            }
                            for (let i = 0; i < children.length; i++) {
                                sum += children[i].clientWidth;
                                if (children[i].children[0].className == 'active' && sum > this.submenu_dropdawn.nativeElement.clientWidth) {

                                    this.submenu_dropdawn.nativeElement.scrollTo(sum - children[i].clientWidth, 0)
                                } else if (sum < this.submenu_dropdawn.nativeElement.clientWidth) {
                                    this.submenu_dropdawn.nativeElement.scrollTo(0, 0)
                                }

                            }
                        }

                    }
                    else {
                        let sum: number = 0;
                        if (offsetX >= 768 && offsetX < 1024) {
                            elementBound = element.offsetTop + 230;
                            currentIndex = 5;
                        }

                        if (offset >= elementBound) {
                            if (index == 0) {
                                this.renderer.setElementClass(this.dishes_dropdown.nativeElement.children[0].children[0], 'active', true);
                            } else {
                                this.renderer.setElementClass(this.dishes_dropdown.nativeElement.children[0].children[0], 'active', false);
                            }

                            for (let key in this.to_cregory) {
                                this.to_cregory[key] = false;
                                this.to_cregory[item.Number] = true;

                            }
                            for (let i = 0; i < children.length; i++) {
                                sum += children[i].clientWidth;

                                if (children[i].children[0].className == 'active' && sum >= this.submenu_dropdawn.nativeElement.clientWidth - 100) {

                                    this.submenu_dropdawn.nativeElement.scrollTo(sum - children[i].clientWidth, 0)
                                } else if (sum < this.submenu_dropdawn.nativeElement.clientWidth) {
                                    this.submenu_dropdawn.nativeElement.scrollTo(0, 0)
                                }

                            }
                        }
                    }
                });

            } else {

                this.renderer.setElementClass(this.dishes_dropdown.nativeElement.children[0].children[0], 'active', true);
                let submenuStyle = this.submenu_block.nativeElement.style;
                submenuStyle.position = 'absolute';
                submenuStyle.zIndex = '8';
                submenuStyle.top = '';
                if (offsetX < 768) {
                    submenuStyle.width = '';
                }
            }
        }

        if (!this.show_bucket) {
            const rect = banner.nativeElement.getBoundingClientRect();
            this.onWindowResize(event);

            if (offset > 450 && offset < (dishesRect.height - rect.height)) {

                let bannerStyle = this.banner_block.nativeElement.style;
                bannerStyle.position = 'fixed';
                bannerStyle.right = posWidth + 'px';
                bannerStyle.top = '60px';
            } else {
                if ((dishesRect.height - offset + 61) < clientHeight) {
                    let bannerStyle = this.banner_block.nativeElement.style;
                    bannerStyle.position = 'absolute';
                    bannerStyle.right = '40px';
                    bannerStyle.bottom = '0';
                    bannerStyle.top = '';
                } else {
                    if (offset > (dishesRect.height - rect.height) && (dishesRect.height - offset + 61) > clientHeight) {
                        let bannerStyle = this.banner_block.nativeElement.style;
                        bannerStyle.position = 'fixed';
                        bannerStyle.right = posWidth + 'px';
                        bannerStyle.top = '60px';
                    } else {
                        let bannerStyle = this.banner_block.nativeElement.style;
                        bannerStyle.position = 'absolute';
                        bannerStyle.right = '40px';
                        bannerStyle.top = '120px';
                    }
                }

            }

        } else {

            const bucketRect = bucket.nativeElement.getBoundingClientRect();
            this.onWindowResize(event);
            if (offset > 450 && offset < (dishesRect.height - bucketRect.height)) {
                let bucketStyle = this.bucket_block.nativeElement.style;
                bucketStyle.position = 'fixed';
                bucketStyle.right = posWidth + 'px';
                bucketStyle.top = '60px';
                bucketStyle.bottom = '';
            } else {
                if ((dishesRect.height - offset + 80 + bucketRect.height * 2) < clientHeight) {
                    let bucketStyle = this.bucket_block.nativeElement.style;
                    bucketStyle.position = 'absolute';
                    bucketStyle.right = '40px';
                    bucketStyle.bottom = '0';
                    bucketStyle.top = '';
                } else {
                    if (offset > (dishesRect.height - bucketRect.height) && (dishesRect.height - offset + 80 + bucketRect.height * 2) > clientHeight) {
                        let bucketStyle = this.bucket_block.nativeElement.style;
                        bucketStyle.position = 'absolute';
                        bucketStyle.right = '50px';
                        bucketStyle.top = '';
                        bucketStyle.bottom = 0;
                    } else {
                        let bucketStyle = this.bucket_block.nativeElement.style;
                        bucketStyle.position = 'absolute';
                        bucketStyle.right = '40px';
                        bucketStyle.top = '120px';
                    }
                }
            }
        }
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize(event) {
        let offsetWidth = event.currentTarget.innerWidth;
        let docWidth = document.body.clientWidth;
        if (!this.show_bucket) {
            if (offsetWidth < 1269 && offsetWidth >= 1024) {
                let blockArr = document.getElementsByClassName('dishes_content_menu_blocks_wrapper');
                for (let i = 0; i < blockArr.length; i++) {
                    document.getElementById(blockArr[i].id).style.width = (docWidth - this.banner_block.nativeElement.offsetWidth) - 80 + 'px';
                }
            }
            if (offsetWidth > 1270) {
                let blockArr = document.getElementsByClassName('dishes_content_menu_blocks_wrapper');
                for (let i = 0; i < blockArr.length; i++) {
                    document.getElementById(blockArr[i].id).style.width = (docWidth - this.banner_block.nativeElement.offsetWidth) - 80 + 'px';
                }
            }
            if (offsetWidth < 1024) {
                let blockArr = document.getElementsByClassName('dishes_content_menu_blocks_wrapper');
                for (let i = 0; i < blockArr.length; i++) {
                    document.getElementById(blockArr[i].id).style.width = 'inherit';
                }
            }
        } else {
            if (offsetWidth < 1269 && offsetWidth > 1024) {
                let blockArr = document.getElementsByClassName('dishes_content_menu_blocks_wrapper');
                for (let i = 0; i < blockArr.length; i++) {
                    document.getElementById(blockArr[i].id).style.width = (docWidth - this.bucket_block.nativeElement.offsetWidth) - 74 + 'px';
                }
            }
            if (offsetWidth > 1270) {
                let blockArr = document.getElementsByClassName('dishes_content_menu_blocks_wrapper');
                for (let i = 0; i < blockArr.length; i++) {
                    document.getElementById(blockArr[i].id).style.width = (docWidth - this.bucket_block.nativeElement.offsetWidth) - 74 + 'px';
                }
            }
            if (offsetWidth < 1024) {
                let blockArr = document.getElementsByClassName('dishes_content_menu_blocks_wrapper');
                for (let i = 0; i < blockArr.length; i++) {
                    document.getElementById(blockArr[i].id).style.width = 'inherit';
                }
            }
        }
    }

    @HostListener('document:click', ['$event'])
    onWindowClick(event) {
        if (event.target.closest('.menu_tabs_dishes_dropdown')) {
        } else {
            this.show_dishes = false;
        }
        if (event.target.closest('.overlay')) {
            this.closeEvent();
        }

    }

    bindBucketOnScreen() {

        setTimeout(() => {
            let bucketStyle = this.bucket_block.nativeElement.style;
            if (document.body.clientWidth > 1024) {
                if (this.scrollPosition < 500) {
                    bucketStyle.position = 'absolute';
                    bucketStyle.right = '40px';
                    bucketStyle.top = '115px';
                } else {
                    bucketStyle.position = 'fixed';
                    bucketStyle.right = '50px';
                    bucketStyle.top = '60px';
                }
            }

            this.restaurantsListService.bucket_height = this.bucket_block.nativeElement.clientHeight;
        }, 1)
    }

    goToCategory(category_id) {
        let clientWidth = document.documentElement.clientWidth;
        this.route.fragment.subscribe(f => {
            if (clientWidth <= 375 && clientWidth > 320) {
                this.scroll_to = '320';

            }
            else if (clientWidth < 768 && clientWidth > 375 || clientWidth == 320) {
                this.scroll_to = '290';

            } else if (clientWidth >= 768 && clientWidth < 1024) {
                this.scroll_to = '230';

            }
            else {
                this.scroll_to = '340';

            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.renderer.setElementClass(this.dishes_dropdown.nativeElement.children[0].children[0], 'active', true);

        if (this.orderService.order_arr_bucket_keys.length != 0) {

            this.bucket_height = this.restaurantsListService.bucket_height;
            setTimeout(() => {
                this.getBucketHeight();
            }, 0)

        }
        // let docWidth = document.body.clientWidth;
        // if (!this.show_bucket) {
        //     if (docWidth < 1269 && docWidth >= 1024) {
        //         let blockArr = document.getElementsByClassName('dishes_content_menu_blocks_wrapper');
        //         for (let i = 0; i < blockArr.length; i++) {
        //             document.getElementById(blockArr[i].id).style.width = (docWidth - this.banner_block.nativeElement.offsetWidth) - 80 + 'px';
        //             debugger;
        //         }
        //     }
        //     if (docWidth > 1270) {
        //         let blockArr = document.getElementsByClassName('dishes_content_menu_blocks_wrapper');
        //         for (let i = 0; i < blockArr.length; i++) {
        //             document.getElementById(blockArr[i].id).style.width = 'inherit';
        //         }
        //     }
        //     if (docWidth < 1024) {
        //         let blockArr = document.getElementsByClassName('dishes_content_menu_blocks_wrapper');
        //         for (let i = 0; i < blockArr.length; i++) {
        //             document.getElementById(blockArr[i].id).style.width = 'inherit';
        //         }
        //     }
        // } else {
        //     if (docWidth < 1269 && docWidth > 1024) {
        //         let blockArr = document.getElementsByClassName('dishes_content_menu_blocks_wrapper');
        //         for (let i = 0; i < blockArr.length; i++) {
        //             document.getElementById(blockArr[i].id).style.width = (docWidth - this.bucket_block.nativeElement.offsetWidth) - 80 + 'px';
        //
        //         }
        //     }
        //     if (docWidth > 1270) {
        //         let blockArr = document.getElementsByClassName('dishes_content_menu_blocks_wrapper');
        //         for (let i = 0; i < blockArr.length; i++) {
        //             document.getElementById(blockArr[i].id).style.width = 'inherit';
        //         }
        //     }
        //     if (docWidth < 1024) {
        //         let blockArr = document.getElementsByClassName('dishes_content_menu_blocks_wrapper');
        //         for (let i = 0; i < blockArr.length; i++) {
        //             document.getElementById(blockArr[i].id).style.width = 'inherit';
        //         }
        //     }
        // }
    }

    showDishes() {

        if (this.show_dishes == true) {
            this.show_dishes = false;
        } else this.show_dishes = true;
    }

    addItem(id: number, mod_id: number, key) {
        let result;
        this.arr_bucket_length = 0;
        for (let rest in this.orderService.order_arr_bucket) {
            for (let i = 0; i < this.bucketItemOther.nativeElement.children.length; i++) {
                if (rest == key && this.bucketItemOther.nativeElement.children[i].id == rest) {
                    result = this.bucketModule.addItem(id, this.orderService.order_arr_bucket[rest].items, this.total_price, mod_id, this.bucketItemOther.nativeElement.children[i], this.other_rest, this.restaurant_id);
                    for (let restorant in this.orderService.order_arr_bucket) {
                        this.arr_bucket_length += this.orderService.order_arr_bucket[restorant].items.length;
                        this.orderService.arr_bucket_length = this.arr_bucket_length;
                    }
                }
            }

        }

        this.dishes_arr = result.arr;
        this.total_price = result.total;
        this.orderService.total_price = result.total;
        this.orderService.order_arr = result.arr.slice(0);

        this.dishes_arr.forEach((item) => {
            this.quantity_last[item.id] = item.quantity;
            for (let rest in this.orderService.order_arr_bucket) {
                this.orderService.order_arr_bucket[rest].items.forEach(dish => {

                    if (dish.id == item.id && dish.Modifiers.length == 0) {
                        dish.quantity = item.quantity;
                        dish.quantity_price = item.quantity_price;
                    }
                    if (dish.id == item.id && dish.Modifiers.length != 0 && dish.Modifiers[0].Code == mod_id && dish.Modifiers[0].Code == item.Modifiers[0].Code) {
                        dish.quantity = item.quantity;
                        dish.quantity_price = item.quantity_price;
                    }
                });
                localStorage.setItem('bucket',JSON.stringify(this.orderService.order_arr_bucket));
                localStorage.setItem('total_price',JSON.stringify(this.orderService.total_price));
            }
        });
    }

    removeItem(id, mod_id, key) {
        this.arr_bucket_length = 0;
        let result;
        for (let rest in this.orderService.order_arr_bucket) {
            for (let i = 0; i < this.bucketItemOther.nativeElement.children.length; i++) {
                if (rest == key && this.bucketItemOther.nativeElement.children[i].id == rest) {

                    result = this.bucketModule.removeItem(id, this.orderService.order_arr_bucket[rest].items, this.total_price, this.bucketItemOther.nativeElement.children[i], mod_id, this.other_rest, this.restaurant_id);
                    for (let restorant in this.orderService.order_arr_bucket) {
                        this.arr_bucket_length += this.orderService.order_arr_bucket[restorant].items.length;
                        this.orderService.arr_bucket_length = this.arr_bucket_length;
                    }
                }
            }

        }

        this.dishes_arr = result.arr.slice(0);
        this.total_price = result.total;
        this.orderService.order_arr = result.arr.slice(0);
        this.orderService.total_price = result.total;
        this.dishes_arr.forEach((item) => {
            this.quantity_last[item.id] = item.quantity;
            for (let rest in this.orderService.order_arr_bucket) {
                this.orderService.order_arr_bucket[rest].items.forEach(dish => {
                    if (dish.id == item.id && dish.Modifiers.length == 0) {
                        dish.quantity = item.quantity;
                        dish.quantity_price = item.quantity_price;
                    }
                    if (dish.id == item.id && dish.Modifiers.length != 0 && dish.Modifiers[0].Code == mod_id && dish.Modifiers[0].Code == item.Modifiers[0].Code) {
                        dish.quantity = item.quantity;
                        dish.quantity_price = item.quantity_price;
                    }
                });
                localStorage.setItem('bucket',JSON.stringify(this.orderService.order_arr_bucket));
            }
        });
    }

    addOrder() {

        this.orderService.total_price = this.total_price;
        if ($(document).width() < 1024) {
            $(document.body).css('overflow', 'unset');
            $(document.body).css({position: 'unset'});
            this.router.navigate(["/order"]);
        } else {
            this.router.navigate(["/bucket"]);
        }

    }

    getBucketHeight() {

        let bucket = this.bucket_block;
        let windowHeight = (window.innerHeight);
        let height;
        if (this.bucket_height == 0 || !this.other_rest) {
            height = bucket.nativeElement.clientHeight;
            this.restaurantsListService.bucket_height = bucket.nativeElement.clientHeight;
        } else height = this.bucket_height;
        if (height > windowHeight - 100) {
            windowHeight = windowHeight - 40 - 61;
            let itemsHeight = windowHeight - 162;
            if (this.other_rest) {
                bucket.nativeElement.children[1].style.height = windowHeight + 'px';
                bucket.nativeElement.children[1].style.height = itemsHeight + 'px';
                bucket.nativeElement.children[1].style.overflowY = 'scroll';
                bucket.nativeElement.style.width = 260 + 'px';
            } else {
                bucket.nativeElement.style.height = windowHeight + 'px';
                bucket.nativeElement.children[1].style.height = itemsHeight + 'px';
                bucket.nativeElement.children[1].style.overflowY = 'scroll';
                bucket.nativeElement.style.width = 260 + 'px';
            }
            this.subs = true;
            this.orderService.subs = this.subs;
        }
    }

    scroll() {
        this.subs = false;
        this.orderService.subs = this.subs;
    }

    showSharing() {
        this.show_bg = true;
        setTimeout(() => {

            if (typeof this.share_btn_fb != 'undefined' && typeof this.share_btn_vk != 'undefined' && typeof this.share_btn_tw != 'undefined' && typeof this.share_btn_email != 'undefined') {

                let icon_fb = this.share_btn_fb.nativeElement.children[0].children[0].children[0].children[0].style;
                let icon_vk = this.share_btn_vk.nativeElement.children[0].children[0].children[0].children[0].style;
                let icon_tw = this.share_btn_tw.nativeElement.children[0].children[0].children[0].children[0].style;
                let iconParent_fb = this.share_btn_fb.nativeElement.children[0].style;
                let btnStyle_fb = this.share_btn_fb.nativeElement.children[0].style;
                btnStyle_fb.border = 'none';
                btnStyle_fb.backgroundColor = 'transparent';
                icon_fb.display = 'none';
                iconParent_fb.width = '13px';
                iconParent_fb.height = '18px';
                iconParent_fb.cursor = 'pointer';
                iconParent_fb.outline = 'none';


                let iconParent_vk = this.share_btn_vk.nativeElement.children[0].style;
                let btnStyle_vk = this.share_btn_vk.nativeElement.children[0].style;
                btnStyle_vk.border = 'none';
                btnStyle_vk.backgroundColor = 'transparent';
                icon_vk.display = 'none';
                iconParent_vk.width = '13px';
                iconParent_vk.height = '18px';
                iconParent_vk.cursor = 'pointer';
                iconParent_vk.outline = 'none';


                let iconParent_tw = this.share_btn_tw.nativeElement.children[0].style;
                let btnStyle_tw = this.share_btn_tw.nativeElement.children[0].style;
                btnStyle_tw.border = 'none';
                btnStyle_tw.backgroundColor = 'transparent';
                icon_tw.display = 'none';
                iconParent_tw.width = '13px';
                iconParent_tw.height = '18px';
                iconParent_tw.cursor = 'pointer';
                iconParent_tw.outline = 'none';

                let icon_email = this.share_btn_email.nativeElement.children[0].children[0].children[0].children[0].style;
                let iconParent_email = this.share_btn_email.nativeElement.children[0].style;
                let btnStyle_email = this.share_btn_email.nativeElement.children[0].style;
                btnStyle_email.border = 'none';
                btnStyle_email.backgroundColor = 'transparent';
                icon_email.display = 'none';
                iconParent_email.width = '13px';
                iconParent_email.height = '18px';
                iconParent_email.cursor = 'pointer';
                iconParent_email.outline = 'none';

            }

        }, 0);
    }

    closeEvent() {
        $('.busket_mob').css('display', 'none');
        $(document.body).css('overflow', 'unset');
        $(document.body).css({position: 'unset'});
    }

}
