import { Injectable } from '@angular/core';
import { UrlAdresses } from '../url_adresses';

@Injectable()
export class OrderFormService {
    base_url: string;
    getClientAdresses: string;
    adresses_arr = [];
    add_new_adress: boolean = false;

    constructor(private urlAdresses:UrlAdresses) {

        this.base_url = urlAdresses.base_url;
        this.getClientAdresses = urlAdresses.getClientAdresses;
    }

}