import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OrderService} from '../order.service';
import {BucketModule} from '../bucket-module';
import {HeaderService} from '../header/header.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-bucket',
    templateUrl: './bucket.component.html',
    styleUrls: ['./bucket.component.scss']
})
export class BucketComponent implements OnInit {
    @ViewChild('bucketItem') bucket_item: ElementRef;

    constructor(private route: Router, public orderService: OrderService, private bucketModule: BucketModule, private headerService: HeaderService) {
    }

    ngOnInit() {
    }

    addItem(id, mod_id: number, key) {

        let result;
        for (let rest in this.orderService.order_arr_bucket) {

            for (let i = 0; i < this.bucket_item.nativeElement.children.length; i++) {

                if (rest == key && this.bucket_item.nativeElement.children[i].id == rest) {

                    result = this.bucketModule.addItem(id, this.orderService.order_arr_bucket[rest].items, this.orderService.total_price, mod_id, this.bucket_item.nativeElement.children[i], false, key);
                }
            }

        }

        // let result = this.bucketModule.addItem(id,this.orderService.order_arr,this.orderService.total_price,mod_id);
        this.orderService.order_arr = result.arr;
        this.orderService.total_price = result.total;
        this.orderService.order_arr.forEach((item, i, arr) => {
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
            }
        });
    }

    removeItem(id, mod_id, key) {
        let result;
        for (let rest in this.orderService.order_arr_bucket) {
            for (let i = 0; i < this.bucket_item.nativeElement.children.length; i++) {
                if (rest == key && this.bucket_item.nativeElement.children[i].id == rest) {
                    result = this.bucketModule.removeItem(id, this.orderService.order_arr_bucket[rest].items, this.orderService.total_price, this.bucket_item.nativeElement.children[i], mod_id, false, key);

                }
            }

        }
        this.orderService.order_arr = result.arr;
        this.orderService.total_price = result.total;
        this.orderService.order_arr.forEach((item, i, arr) => {
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
            }
        });

    }

    makeOrder() {
        // if(this.headerService.login == true) {
        this.route.navigate(['/order']);
        // }else {
        //   this.route.navigate(['/login']);
        //   this.headerService.getUrl(this.route.url);
        // }
    }
}
