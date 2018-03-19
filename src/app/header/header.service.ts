/**
 * Created by aliska on 02.03.2018.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class HeaderService {

    current_url: string;
    login: boolean = false;

    constructor() {}

    getUrl(url) {
        this.current_url = url;
        debugger;
    }

}
