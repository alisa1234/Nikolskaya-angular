export class UrlAdresses {

    base_url: string = 'http://crm-vs.wrf.su:8080/WCF/VirtualCardSecureService.svc';
    getRestaurants_list: string = '/GetRestaurantsMenu';
    // getEvents_list: string = '/News';
    getEvents_list: string = '/Offers';
    getClientAdresses: string = '/GetClientAddresses';
    login: string = '/Login';
    signin: string = '/Register';
    getVacancies: string = '/GetVacancies';
    sendVacansies: string = '/EmailVacancySender';
    getClientAccount: string = '/GetClientAccount';
    getFeddbackTypes: string = '/GetFeedbackTypes';
    sendFeedback: string = '/FeedbackSender';
    resetPassword: string = '/ResetPassword';
    getAbout: string = '/About';
    changePassword: string = '/ChangePassword';
    changePersonal: string = '/ChangeNames';
    GetStreets: string = '/GetStreets';
    AddClientAdress: string = '/AddClientAddresses';
    GetInstaPhoto: string = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=1443933719.1677ed0.f73ae45f8b8b4c09a8400dd1737ace27&count=4';
    getMenuVersion: string = '/GetMenuVersion';
    getFavoriteEvents: string = '/GetOffersFavorite';
    GetMainTags: string = '/GetMainTags';
    MakeOrder: string = '/MakeOrder';
    GetSmsToken: string = '/SendSmsAuthToken';
    GetClientOrder: string = '/ClientOrders';
    ClientOrdersDetailed: string = '/ClientOrdersDetailed';
}
