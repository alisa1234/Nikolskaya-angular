import {Component, OnInit, Input} from '@angular/core';
import {OrderFormService} from '../order-form.service';

@Component({
    selector: 'app-order-delivery',
    templateUrl: './order-delivery.component.html',
    styleUrls: ['./order-delivery.component.scss'],
    host: {'class': 'root'}
})

export class OrderDeliveryComponent implements OnInit {
    @Input() _parent: any;

    constructor(public orderFormService: OrderFormService) {
    }

    ngOnInit() {
    }

    AddNewAdress() {

        this.orderFormService.add_new_adress = true;
    }

    getAddressId(id) {
        this._parent.address_id = id;
    }

}
