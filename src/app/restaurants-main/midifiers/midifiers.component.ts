import {Component, OnInit, HostListener, Input} from '@angular/core';
declare let $: any;

@Component({
    selector: 'app-midifiers',
    templateUrl: './midifiers.component.html',
    styleUrls: ['./midifiers.component.scss'],
    host: {'class': 'root'}
})
export class MidifiersComponent implements OnInit {
    @Input() _parent: any;
    @Input() hidden: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    @HostListener('document:click', ['$event'])

    clickLink(event) {

        if (event.target.closest('.overlay')) {
            this.closeEvent();
        }
    }

    closeEvent() {
        if (this._parent.modifiers_selected.length == 0 || this._parent.necessarily) {
            for (let rest in this._parent.orderService.order_arr_bucket) {
                for (let i = 0; i < this._parent.orderService.order_arr_bucket[rest].items.length; i++) {
                    if (this._parent.modifiers['dish_id'] == this._parent.orderService.order_arr_bucket[rest].items[i].id
                        && this._parent.orderService.order_arr_bucket[rest].items[i].Modifiers.length == 0
                        && this._parent.orderService.order_arr_bucket[rest].items[i].quantity == 1) {
                        this._parent.total_price = this._parent.total_price - this._parent.orderService.order_arr_bucket[rest].items[i].price;
                        this._parent.orderService.total_price = this._parent.total_price;
                        this._parent.orderService.order_arr_bucket[rest].items.splice(i, 1);
                        this._parent.dishes_arr.splice(i, 1);
                        this._parent.in_bucket[this._parent.modifiers['dish_id']] = false;

                    }
                }
            }
            this._parent.arr_bucket_length = 0;
            for (let restorant in this._parent.orderService.order_arr_bucket) {
                this._parent.arr_bucket_length += this._parent.orderService.order_arr_bucket[restorant].items.length;
                this._parent.orderService.arr_bucket_length = this._parent.arr_bucket_length;
            }
        }
        this._parent.open_modifiers = false;
        $(document.body).css('overflow', 'unset');
        $(document.body).css({position: 'unset'});
    }

    selectModifiers(event, modifiers_id, name, price) {


        if (event.target.checked && event.target.type != 'radio') {
            this._parent.modifiers_selected.push({Name: name, Code: modifiers_id, Price: price});
        } else if (event.target.checked && event.target.type == 'radio') {
            this._parent.modifiers_selected = [];
            this._parent.modifiers_selected.push({Name: name, Code: modifiers_id, Price: price});
        }
        else {
            for (let i = 0; i < this._parent.modifiers_selected.length; i++) {
                if (event.target.id == this._parent.modifiers_selected[i].Code) {
                    this._parent.modifiers_selected.splice(i, 1);
                }
            }
        }
        if (this._parent.modifiers_selected.length < this._parent.min_selected_modifiers || this._parent.modifiers_selected.length > this._parent.max_selected_modifiers) {
            this._parent.disable = true;
        } else this._parent.disable = false;
    }

    addModifiers(dish_id, rest_id) {

        this._parent.orderService.order_arr_bucket[rest_id].items.forEach((item) => {
            if (item.id == dish_id && item.Modifiers.length == 0) {
                for (let i = 0; i < this._parent.modifiers_selected.length; i++) {
                    item.Modifiers.push(this._parent.modifiers_selected[i]);
                    this._parent.total_price = this._parent.total_price + this._parent.modifiers_selected[i].Price;
                }

            }
            else if (item.id == dish_id && item.Modifiers.length != 0) {

                for (let i = 0; i < this._parent.orderService.order_arr_bucket[rest_id].items.length; i++) {
                    for (let y = 0; y < item.Modifiers.length; y++) {
                        for (let z = 0; z < this._parent.modifiers_selected.length; z++) {
                            if (this._parent.orderService.order_arr_bucket[rest_id].items[i].Modifiers.length != 0 && this._parent.orderService.order_arr_bucket[rest_id].items[i].Modifiers[0].Code == item.Modifiers[y].Code && item.Modifiers[y].Code == this._parent.modifiers_selected[z].Code && this._parent.orderService.order_arr_bucket[rest_id].items[i].id == dish_id) {
                                this._parent.total_price = this._parent.total_price - this._parent.orderService.order_arr_bucket[rest_id].items[i].price;
                                this._parent.orderService.order_arr_bucket[rest_id].items.pop();
                                this._parent.addItem(item.id, item.Modifiers[y].Code, rest_id);
                            }
                        }
                    }
                }
            }
        });

        this._parent.orderService.total_price = this._parent.total_price;
        this._parent.open_modifiers = false;

        this._parent.bindBucketOnScreen();
        $(document.body).css('overflow', 'unset');
        $(document.body).css({position: 'unset'});
    }

}
