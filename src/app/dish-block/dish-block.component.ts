import {Component, OnInit, Input} from '@angular/core';
import {OrderService} from "../order.service";
declare let $: any;

@Component({
    selector: 'app-dish-block',
    templateUrl: './dish-block.component.html',
    styleUrls: ['./dish-block.component.scss'],
    host: {'class': 'root'}
})

export class DishBlockComponent implements OnInit {

    @Input() menu_list: any;
    @Input() _parent: any;
    @Input() restaurant_id: number;
    order_btn: { [index: string]: boolean } = {};
    in_bucket: { [index: string]: boolean } = {};
    quantity: { [index: string]: number } = {};
    show_more: boolean = false;
    hide_btn: boolean = false;
    no_modifiers: boolean = false;


    constructor(public orderService: OrderService) {
    }

    ngOnInit() {
    }

    addOrder(id: number, name: string, price: string, restaurant_id: any, modifiers_group, mod_id) {

        if ($(document).width() < 1024) {
            this.orderService.show_bucket_mob = true;
            this._parent.show_bucket = false;
        } else {
            this.orderService.show_bucket_mob = false;
            this._parent.show_bucket = true;
        }
        this._parent.bindBucketOnScreen();
        this._parent.arr_bucket_length = 0;
        if (modifiers_group != null) {
            $('.chbox_mod').prop('checked', false);
            this._parent.modifiers_selected = [];
            this._parent.open_modifiers = true;
            this._parent.disable = true;
            $(document.body).css({overflow: 'hidden'});
            let offsetX = document.body.clientWidth;
            if (offsetX < 1024) {
                $(document.body).css({position: 'fixed'});
            }
            this._parent.max_selected_modifiers = modifiers_group[0].MaximumSelected;
            this._parent.min_selected_modifiers = modifiers_group[0].MinimumSelected;
            if (modifiers_group[0].minimumSelected == 0) {
                this._parent.necessarily = false;
            } else this._parent.necessarily = true;

            this._parent.modifiers = modifiers_group[0].Modifiers;
            this._parent.modifiers['dish_id'] = id;
            this._parent.modifiers['rest_id'] = this.restaurant_id;

        } else {
            this.no_modifiers = true;
        }


        if (this.orderService.order_arr_bucket_keys.length != 0) {
            this._parent.getBucketHeight(event);
            if (this.no_modifiers) {

                if (this.orderService.order_arr.filter((i) => i.id === id).length != 0) {

                    this._parent.addItem(id, null, restaurant_id);
                } else {
                    if (typeof this._parent.orderService.order_arr_bucket[restaurant_id] != 'undefined') {
                        this._parent.orderService.order_arr_bucket[restaurant_id].items.push({
                            id: id,
                            name: name,
                            price: price,
                            quantity: 1,
                            quantity_price: price,
                            restaurant_id: restaurant_id,
                            Modifiers: []
                        });
                        this._parent.orderService.order_arr_bucket_keys = Object.keys(this._parent.orderService.order_arr_bucket);


                    } else {
                        this._parent.orderService.order_arr_bucket[restaurant_id] = {
                            rest_name: this._parent.restaurant_name,
                            items: [{
                                id: id,
                                name: name,
                                price: price,
                                quantity: 1,
                                quantity_price: price,
                                restaurant_id: restaurant_id,
                                Modifiers: []
                            }]
                        };
                        this._parent.orderService.order_arr_bucket_keys = Object.keys(this._parent.orderService.order_arr_bucket);

                    }
                    this._parent.orderService.order_arr.push({
                        id: id,
                        name: name,
                        price: price,
                        quantity: 1,
                        quantity_price: price,
                        restaurant_id: restaurant_id,
                        Modifiers: [],
                        arr_buket: this._parent.orderService.order_arr_bucket[restaurant_id]
                    });
                    this._parent.total_price = this._parent.total_price + price;

                    this._parent.orderService.total_price = this._parent.total_price;
                    for (let restorant in this.orderService.order_arr_bucket) {

                        this._parent.arr_bucket_length += this.orderService.order_arr_bucket[restorant].items.length;
                        this._parent.orderService.arr_bucket_length = this._parent.arr_bucket_length;
                        if (!this._parent.other_rest) {
                            for (let i = 0; i < this._parent.bucketItemOther.nativeElement.children.length; i++) {
                                if (restorant == restaurant_id && this._parent.bucketItemOther.nativeElement.children[i].id == restaurant_id) {
                                    this._parent.bucketItemOther.nativeElement.children[i].style.display = 'block';

                                }
                            }
                        }
                    }
                }
            } else {
                if (typeof this._parent.orderService.order_arr_bucket[restaurant_id] != 'undefined') {
                    this._parent.orderService.order_arr_bucket[restaurant_id].items.push({
                        id: id,
                        name: name,
                        price: price,
                        quantity: 1,
                        quantity_price: price,
                        restaurant_id: restaurant_id,
                        Modifiers: []
                    });
                    this._parent.orderService.order_arr_bucket_keys = Object.keys(this._parent.orderService.order_arr_bucket);


                } else {
                    this._parent.orderService.order_arr_bucket[restaurant_id] = {
                        rest_name: this._parent.restaurant_name,
                        items: [{
                            id: id,
                            name: name,
                            price: price,
                            quantity: 1,
                            quantity_price: price,
                            restaurant_id: restaurant_id,
                            Modifiers: []
                        }]
                    };
                    this._parent.orderService.order_arr_bucket_keys = Object.keys(this._parent.orderService.order_arr_bucket);


                }
                this._parent.orderService.order_arr.push({
                    id: id,
                    name: name,
                    price: price,
                    quantity: 1,
                    quantity_price: price,
                    restaurant_id: restaurant_id,
                    Modifiers: [],
                    arr_buket: this._parent.orderService.order_arr_bucket[restaurant_id]
                });
                this._parent.total_price = this._parent.total_price + price;

                this._parent.orderService.total_price = this._parent.total_price;
                this.orderService.order_arr.forEach((item) => {
                    if (item.id == id) {
                        this.quantity[id] = item.quantity;
                    }

                });
                for (let restorant in this.orderService.order_arr_bucket) {
                    this._parent.arr_bucket_length += this.orderService.order_arr_bucket[restorant].items.length;
                    this._parent.orderService.arr_bucket_length = this._parent.arr_bucket_length;

                    if (!this._parent.other_rest) {
                        for (let i = 0; i < this._parent.bucketItemOther.nativeElement.children.length; i++) {
                            if (restorant == restaurant_id && this._parent.bucketItemOther.nativeElement.children[i].id == restaurant_id) {
                                this._parent.bucketItemOther.nativeElement.children[i].style.display = 'block';
                            }
                        }
                    }
                }
            }
        } else {
            this._parent.arr_bucket_length = 0;
            this._parent.orderService.order_arr_bucket[restaurant_id] = {
                rest_name: this._parent.restaurant_name,
                items: [{
                    id: id,
                    name: name,
                    price: price,
                    quantity: 1,
                    quantity_price: price,
                    restaurant_id: restaurant_id,
                    Modifiers: []
                }]
            };
            this._parent.orderService.order_arr_bucket_keys = Object.keys(this._parent.orderService.order_arr_bucket);
            this._parent.orderService.order_arr.push({
                id: id,
                name: name,
                price: price,
                quantity: 1,
                quantity_price: price,
                restaurant_id: restaurant_id,
                Modifiers: [],
                arr_buket: this._parent.orderService.order_arr_bucket[restaurant_id]
            });
            this._parent.total_price = this._parent.total_price + price;
            this._parent.orderService.total_price = this._parent.total_price;
            for (let restorant in this.orderService.order_arr_bucket) {
                this._parent.arr_bucket_length += this.orderService.order_arr_bucket[restorant].items.length;
                this._parent.orderService.arr_bucket_length = this._parent.arr_bucket_length;
                if (this._parent.other_rest) {
                    for (let i = 0; i < this._parent.bucketItemOther.nativeElement.children.length; i++) {
                        if (restorant == restaurant_id && this._parent.bucketItemOther.nativeElement.children[i].id == restaurant_id) {

                            this._parent.bucketItemOther.nativeElement.children[i].style.display = 'block';
                        }
                    }
                }
            }
        }
        localStorage.setItem('bucket',JSON.stringify(this.orderService.order_arr_bucket));
        localStorage.setItem('keys',JSON.stringify(this.orderService.order_arr_bucket_keys));
        localStorage.setItem('total_price',JSON.stringify(this.orderService.total_price));
    }

    addItem(id: number) {
        this._parent.addItem(id);
        this._parent.dishes_arr.forEach((item) => {
            if (item.id == id) {
                this.quantity[id] = item.quantity;
            }

        })
    }

    removeItem(id: number) {
        this._parent.removeItem(id);
        if (this._parent.dishes_arr.find(item => item.id === id)) {
            for (let i = 0; i < this._parent.dishes_arr.length; i++) {

                this._parent.dishes_arr.forEach((item) => {
                    if (item.id == id) {
                        this.quantity[id] = item.quantity;
                    }

                })

            }
        } else {
            this.in_bucket[id] = false;
        }

    }
}
