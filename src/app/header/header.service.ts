import { Injectable } from '@angular/core';

@Injectable()
export class HeaderService {

    current_url: string;
    login: boolean = false;
    client_about: Object;

    constructor() {}

    getUrl(url) {
        this.current_url = url;
    }

}
