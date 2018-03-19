/**
 * Created by aliska on 19.12.2017.
 */

export class UrlAdresses {
    base_url: string = 'http://decusagency.westeurope.cloudapp.azure.com:8090/VirtualCardSecureService.svc';
    getRestaurants_list: string = '/GetRestaurantsMenu';
    getEvents_list: string = '/News';
    getClientAdresses: string = '/GetClientAddresses';
    login: string = '/Login';
    signin: string = '/Register';
    getVacancies: string = '/GetVacancies';
    sendVacansies: string = '/EmailVacancySender';
    getClientAccount:string = '/GetClientAccount';
    resetPassword: string = '/ResetPassword';
    getAbout: string = '/About';
    changePassword: string = '/ChangePassword';
    changePersonal: string = '/ChangeNames';
    GetStreets: string = '/GetStreets';
    AddClientAdress: string = '/AddClientAddresses';
    GetInstaPhoto: string = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=1443933719.1677ed0.548affd3e7474b82933496a46e8b33dc&count=4';


}
