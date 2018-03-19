import {Component, OnInit, Input} from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";
import {OrderService} from "../order.service";

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

    constructor(public orderService:OrderService) {

    }

    ngOnInit() {
    }

    addOrder(id:number,name:string,price:string,restaurant_id:number) {

        this._parent.show_bucket = true;
        this._parent.bindBucketOnScreen();
        if(this.orderService.order_arr.length!=0){
            this._parent.getBucketHeight(event);
            if(this.orderService.order_arr.filter((i)=>i.id === id).length!=0){
               this._parent.addItem(id);
            }else {

                this._parent.orderService.order_arr.push({id:id,name:name,price:price,quantity:1,quantity_price:price,restaurant_id:restaurant_id});
                this._parent.dishes_arr.push({id:id,name:name,price:price,quantity:1,quantity_price:price,restaurant_id:restaurant_id});
                this._parent.total_price = this._parent.total_price+price;
                this._parent.orderService.total_price = this._parent.total_price;
            }
        }else{
            this._parent.orderService.order_arr.push({id:id,name:name,price:price,quantity:1,quantity_price:price,restaurant_id:restaurant_id});
            this._parent.dishes_arr.push({id:id,name:name,price:price,quantity:1,quantity_price:price,restaurant_id:restaurant_id});
            this._parent.total_price = this._parent.total_price+price;
            this._parent.orderService.total_price = this._parent.total_price;
        }
    }
}
