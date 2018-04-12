import { Injectable } from '@angular/core';

interface IClientData {
    LastName: string;
    FirstName: string;
    BonusLevelInfo:{ForSpentSum:any,PaySum:any};
}

@Injectable()
export class PersonalService {

    client_data: IClientData;

    constructor(){

        this.client_data = JSON.parse(localStorage.getItem('client_about'));
    }

}