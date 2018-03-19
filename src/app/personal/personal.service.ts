/**
 * Created by aliska on 06.03.2018.
 */
import { Injectable } from '@angular/core';

interface IClientData {
    LastName: string;
    FirstName: string;
    BonusLevelInfo: Object;
}
@Injectable()
export class PersonalService {
    client_data: IClientData;

    constructor(){
        this.client_data = JSON.parse(localStorage.getItem('client_about'));
        debugger;
    }


}