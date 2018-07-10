import {Component, OnInit, AfterViewInit} from '@angular/core';
import {UrlAdresses} from '../url_adresses';
import {OrderService} from '../order.service';
import {OrderFormService} from './order-form.service';
import 'rxjs/Rx';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
declare var $: any;

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.scss']
})

export class OrderFormComponent implements OnInit, AfterViewInit {
    AddClientAdress: string;
    GetStreets: string;
    MakeOrder: string;
    type_delivery: { [index: string]: boolean } = {};
    active_pay: { [index: string]: boolean } = {};
    checked: boolean = false;
    by_time: boolean = false;
    person_count: number = 1;
    base_url: string;
    order: Object = {};
    order_arr_copy = [];
    get_time: Date;
    day: string = 'day';
    hour: number = 0;
    minute: number = 0;
    form_adresses: FormGroup;
    form_client: FormControl;
    client_adresses_arr;
    street_id = {Name: '', Count: '10'};
    adresses_arr = [];
    street: string;
    comment: string;
    address_id: any;
    name: string;
    email: string;
    disable_time: boolean = true;
    FirstName: FormControl;
    Email: FormControl;
    PhoneNumber: FormControl;
    StreetId: FormControl;
    Building: FormControl;
    Entry: FormControl;
    EntryCode: FormControl;
    Floor: FormControl;
    Appartaments: FormControl;
    BuildingNumber: FormControl;
    BuildingAppartment: FormControl;
    error_text: { [index: string]: string } = {};
    error: { [index: string]: boolean } = {};
    change: string = '';
    make_order_success: boolean = false;
    read_only_change: boolean = false;
    error_make_order: boolean = false;
    loader: boolean = false;
    prepayments_arr = [];

    constructor(public router: Router, private http: HttpClient, private urlAdresses: UrlAdresses, public orderFormService: OrderFormService, public orderService: OrderService, public form: FormBuilder) {
        this.AddClientAdress = urlAdresses.AddClientAdress;
        this.GetStreets = urlAdresses.GetStreets;
        this.MakeOrder = urlAdresses.MakeOrder;
        this.base_url = urlAdresses.base_url;
        this.type_delivery['delivery'] = true;
        this.type_delivery['selfdelivery'] = false;
        this.error['FirstName'] = false;
        this.error['Email'] = false;
        this.error['PhoneNumber'] = false;
        this.error['StreetId'] = false;
        this.error['Building'] = false;
        this.active_pay['cash'] = false;
        this.active_pay['card'] = false;


        for (let i = 0; i < orderService.order_arr.length; i++) {
            this.order_arr_copy.push({
                Name: orderService.order_arr[i].name,
                Code: orderService.order_arr[i].id,
                Quantity: orderService.order_arr[i].quantity,
                Prise: orderService.order_arr[i].price
            });
        }
        this.order = {Sum: orderService.total_price, DeliveryType: 1};


        this.client_adresses_arr = JSON.parse(localStorage.getItem('client_adresses'));
    }

    createForm() {

        this.form_adresses = this.form.group({
            StreetId: this.StreetId,
            Building: this.Building,
            Entry: this.Entry,
            EntryCode: this.EntryCode,
            Floor: this.Floor,
            Appartaments: this.Appartaments,
            BuildingNumber: this.BuildingNumber,
            BuildingAppartment: this.BuildingAppartment,
            form_client: this.form.group({
                FirstName: this.FirstName,
                Email: this.Email,
                PhoneNumber: this.PhoneNumber
            })

        });

    }

    createControls() {
        this.FirstName = new FormControl('', [
            Validators.required,
        ]);
        this.Email = new FormControl('', [
            Validators.email,
        ]);
        this.PhoneNumber = new FormControl('', [
            Validators.required,
        ]);

        this.StreetId = new FormControl('', [
            Validators.required,
        ]);
        this.Building = new FormControl('', [
            Validators.required,
        ]);
    }

    ngOnInit() {
        this.createControls();
        this.createForm();
    }

    ngAfterViewInit() {
        $('.order-container_wrapper_form_group_item_input_hour_select').prop('disabled', true);
        $('.order-container_wrapper_form_group_item_input_minute_select').prop('disabled', true);
    }

    showDescriptionDelivery() {

        this.type_delivery['delivery'] = true;
        this.type_delivery['selfdelivery'] = false;
    }

    showDescriptionSelfdelivery() {

        this.type_delivery['selfdelivery'] = true;
        this.type_delivery['delivery'] = false;
    }

    selectCheckbox(event) {

        if (event.target.checked) {
            this.checked = true;
        } else this.checked = false;
    }

    SelectTime(day) {
        if (day !== 'day') {
            $('.order-container_wrapper_form_group_item_input_hour_select').prop('disabled', false);
            $('.order-container_wrapper_form_group_item_input_minute_select').prop('disabled', false);
            this.disable_time = false;
        } else {
            $('.order-container_wrapper_form_group_item_input_hour_select').prop('disabled', true);
            $('.order-container_wrapper_form_group_item_input_minute_select').prop('disabled', true);
            this.disable_time = true;
        }
    }

    addPerson() {

        this.person_count++;
    }

    removePerson() {

        this.person_count--;

        if (this.person_count <=0) {
            this.person_count = 1;
        }
    }

    selectTime() {
        this.by_time = false;
        this.get_time = new Date();
        this.get_time.setHours(this.get_time.getHours() + 1);
    }

    choosePay(type) {


        for (let key in this.active_pay) {
            this.active_pay[key] = false;
            this.active_pay[type] = true;
        }
        if(type=='card') {
            this.read_only_change = true;
            this.prepayments_arr.push({CurrencyId: 2, Amount: this.orderService.total_price});
        }else {
            this.read_only_change = false;
            this.prepayments_arr.push({CurrencyId: 1, Amount: this.orderService.total_price});
        }


    }

    sendOrder() {
        let dish_arr = [];

        for (let rest in this.orderService.order_arr_bucket) {
            for (let i = 0; i < this.orderService.order_arr_bucket[rest].items.length; i++) {
                dish_arr.push({
                    Name: this.orderService.order_arr_bucket[rest].items[i].name,
                    Code: this.orderService.order_arr_bucket[rest].items[i].id,
                    Quantity: this.orderService.order_arr_bucket[rest].items[i].quantity,
                    Price: this.orderService.order_arr_bucket[rest].items[i].price,
                    Modifiers: this.orderService.order_arr_bucket[rest].items[i].Modifiers
                })
            }
        }

        let date = new Date();
        let day;
        if (this.day == 'day') {
            this.selectTime();
            date = this.get_time;
        } else {
            if (this.day === 'today') {
                day = new Date().getDate();
                date.setHours(this.hour);
                date.setDate(day);
                date.setMinutes(this.minute);
            } else {
                day = new Date().getDate() + 1;
                date.setHours(this.hour);
                date.setDate(day);
                date.setMinutes(this.minute);
            }
        }
        this.adresses_arr.map(index => {
            if (index.Name === this.street) {
                this.form_adresses.controls['StreetId'].setValue(index.Id);
            }
        });

        this.order['DeliveryDateTime'] = date.toISOString();
        this.order['Comment'] = this.comment;
        this.order['PersonCount'] = this.person_count;

        this.order['MenuItems'] = dish_arr;
        this.order['Prepayments'] = this.prepayments_arr;
        if (this.form_adresses.status == 'INVALID') {
            for (let key in this.form_adresses.value) {
                if (key == 'form_client') {
                    for (let client in this.form_adresses.value.form_client) {
                        if (this.form_adresses.value.form_client[client] == '') {

                            this.error[client] = true;
                        } else {
                            this.error[client] = false;
                        }
                    }
                } else {
                    if (this.form_adresses.value[key] == '') {

                        this.error[key] = true;
                    } else {
                        this.error[key] = false;
                    }
                }
            }
        } else {
            for (let key in this.form_adresses.value.form_client) {
                this.error[key] = false;
            }
            for (let key in this.form_adresses.value) {
                this.error[key] = false;
            }
            this.order['Client'] = this.form_adresses.value.form_client;
            this.order['Change'] = this.change;
            let headers: HttpHeaders = new HttpHeaders();
            this.form_adresses.removeControl('form_client');
            this.order['OrderAddress'] = this.form_adresses.value;
            // headers = headers.append('Authorization',localStorage.getItem('access_token'));
            headers = headers.append('Content-Type', 'application/json');
            this.loader = true;
            this.http.post(this.base_url + this.MakeOrder, this.order, {headers: headers})
                .subscribe(res => {
                    this.loader = false;
                    this.make_order_success = true;
                    this.orderService.order_arr_bucket = {};
                    this.orderService.order_arr_bucket_keys = [];
                    this.orderService.quantity = {};
                    this.orderService.order_arr = [];

                },
                err => {
                    this.loader = false;
                    this.error_make_order = true;
                    $(document.body).css({overflow: 'hidden'});
                    let offsetX = document.body.clientWidth;
                    if (offsetX<1024) {
                        $(document.body).css({position: 'fixed'});
                    }
                });
        }


    }

    GetStreetsId(name) {

        let headers: HttpHeaders = new HttpHeaders();
        this.street_id.Name = this.street;
        // headers = headers.append('Authorization',localStorage.getItem('access_token'));
        headers = headers.append('Content-Type', 'application/json');

        this.http.post(this.base_url + this.GetStreets, this.street_id, {headers: headers})
            .subscribe(res => {
                this.adresses_arr = [];
                for (let key in res) {
                    this.adresses_arr.push(res[key]);
                }
            });
    }

    AddAdress() {

        let entry: string = this.form_adresses.get('Entry').value;
        let entryCode: string = this.form_adresses.get('EntryCode').value;
        let floor: string = this.form_adresses.get('Floor').value;
        let appartaments: string = this.form_adresses.get('Appartaments').value;

        this.form_adresses.controls['Entry'].setValue(entry.toString());
        this.form_adresses.controls['EntryCode'].setValue(entryCode.toString());
        this.form_adresses.controls['Floor'].setValue(floor.toString());
        this.form_adresses.controls['Appartaments'].setValue(appartaments.toString());
        this.form_adresses.controls['Building'].setValue('1');

        this.adresses_arr.map(index => {
            if (index.Name === this.street) {
                this.form_adresses.controls['StreetId'].setValue(index.Id);
            }
        });

        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', localStorage.getItem('access_token'));

        this.http.post(this.base_url + this.AddClientAdress, this.form_adresses.value, {headers: headers})
            .subscribe(res => {
                this.orderFormService.UpdateAdresses();
            });

    }
}
