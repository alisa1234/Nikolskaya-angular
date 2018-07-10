import {Component, OnInit, ViewChild, AfterViewInit, Renderer, ElementRef} from '@angular/core';
import {EventsListService} from '../events-list/events-list.service'
import {RestaurantsListService} from '../restaurants-list/restaurants-list.service'
import {UrlAdresses} from "../url_adresses";
import {HttpClient} from '@angular/common/http';
import {} from '@types/googlemaps';
declare let $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit {

    base_url: string;
    getAbout: string;
    getFavoriteEvents: string;
    restaurant_list: any;
    events_list: any;
    restaurant_list_length: number;
    events_list_length: number;
    radius: boolean = false;
    scheme: boolean = false;
    @ViewChild('scheme') schemeElement: ElementRef;
    @ViewChild('schemeImg') schemeImg: ElementRef;
    map_button: { [index: string]: boolean } = {};
    metro_button: { [index: string]: boolean } = {};
    open_metro: boolean = false;
    map: any;
    home_res_list = [];
    home_event_list = [];
    favorite_events;
    index: string;
    id: number;
    image: any;
    header: string;
    start_date: any;
    end_date: any;
    main_text: string;
    open_event: boolean = false;

    constructor(private http: HttpClient, public eventsListService: EventsListService, public restaurantsListService: RestaurantsListService, private urlAdresses: UrlAdresses, public render: Renderer) {

        this.base_url = urlAdresses.base_url;
        this.getAbout = urlAdresses.getAbout;
        this.getFavoriteEvents = urlAdresses.getFavoriteEvents;
        this.map_button['scheme'] = false;
        this.map_button['radius'] = false;
        this.map_button['metro'] = false;
        this.map_button['gmap'] = true;
        this.map_button['maps'] = true;
        this.metro_button['lubyanka'] = false;
        this.metro_button['ploshad'] = false;
        this.metro_button['kitai'] = false;

        this.eventsListService.getEventsList();
        this.eventsListService.change.subscribe(data => {
            this.events_list = data;
            this.events_list_length = data.length;
            for (let i = 0; i < this.events_list.length && i < 3; i++) {
                this.home_event_list.push(this.events_list[i]);
            }
        });

        if (localStorage.length == 0 || typeof JSON.parse(localStorage.getItem('restaurants_list')) == 'undefined' || JSON.parse(localStorage.getItem('restaurants_list')) === null) {
            this.restaurantsListService.getRestaurantsList();
            this.restaurantsListService.change.subscribe(data => {
                this.restaurant_list = data;
                this.restaurant_list_length = data.length;

                for (let i = 0; i < this.restaurant_list.length && i < 6; i++) {
                    this.home_res_list.push(this.restaurant_list[i]);
                }
            })
        } else {
            this.restaurant_list = JSON.parse(localStorage.getItem('restaurants_list'));
            this.restaurant_list_length = this.restaurant_list.length;
            for (let i = 0; i < this.restaurant_list.length && i < 6; i++) {
                this.home_res_list.push(this.restaurant_list[i]);
            }
        }

        this.http.get(this.base_url + this.getAbout)
            .subscribe(data => {
            });
        this.http.get(this.base_url + this.getFavoriteEvents)
            .subscribe(data => {
                this.favorite_events = data;
                localStorage.setItem('favorite_events', JSON.stringify(this.favorite_events))
            })
    }

    ngOnInit() {
    }

    ngAfterViewInit() {

        document.getElementById('gmap').style.height = 500 + 'px';
        document.getElementById('gmap').style.width = 100 + '%';
        document.getElementById('gmap').style.display = 'block';

        this.map = new google.maps.Map(document.getElementById('gmap'), {
            center: new google.maps.LatLng(55.758151, 37.624112),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        });

        let iconBase = 'app/sass/images/map-pin.svg';

        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(55.758151, 37.624112),
            map: this.map,
            title: 'ТЦ Никольская Плаза, 1 этаж\nУл. Никольская, 10.',
            icon: iconBase
        });

        let info = 'ТЦ Никольская Плаза, 1 этаж<br/>Ул. Никольская, 10.';

        let infowindow = new google.maps.InfoWindow({
            content: info
        });
        infowindow.open(this.map, marker);
        marker.addListener('click', function () {
            infowindow.open(this.map, marker);
        });
    }

    setZoom() {
        let clientWidth = document.documentElement.clientWidth;
        if (clientWidth > 1024) {
            this.render.setElementStyle(this.schemeElement.nativeElement.querySelector('.scheme-img'), 'transform', 'scale(2)');
        }

    }

    moveZoom(event) {
        let clientWidth = document.documentElement.clientWidth;
        if (clientWidth > 1024) {
            this.render.setElementStyle(this.schemeImg.nativeElement, 'transform-origin',
                ((event.pageX - this.schemeElement.nativeElement.offsetLeft) /
                this.schemeElement.nativeElement.offsetWidth) * 100 + '%' + (event.offsetY / this.schemeElement.nativeElement.offsetHeight) * 100 + '%');
        }
    }

    removeZoom() {

        this.render.setElementStyle(this.schemeElement.nativeElement.querySelector('.scheme-img'), 'transform', 'scale(1)')
    }

    setCircle(value) {

        if (this.map_button[value] == false) {
            for (let key in this.map_button) {
                this.map_button[key] = false;
                this.map_button[value] = true;
            }
            this.open_metro = false;
            document.getElementById('gmap').style.height = 500 + 'px';
            document.getElementById('gmap').style.width = 100 + '%';
            document.getElementById('gmap').style.display = 'block';

            this.map = new google.maps.Map(document.getElementById('gmap'), {
                center: new google.maps.LatLng(55.758151, 37.624112),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{
                    "featureType": "poi",
                    "stylers": [
                        {"visibility": "off"}
                    ]
                }]
            });

            let iconBase = 'app/sass/images/map-pin.svg';

            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(55.758151, 37.624112),
                map: this.map,
                title: 'ТЦ Никольская Плаза, 1 этаж\nУл. Никольская, 10.',
                icon: iconBase
            });

            let info = 'ТЦ Никольская Плаза, 1 этаж<br/>Ул. Никольская, 10.';

            let infowindow = new google.maps.InfoWindow({
                content: info
            });

            marker.addListener('click', function () {
                infowindow.open(this.map, marker);
            });

            let paths = [
                {lat: 55.746794, lng: 37.582371},
                {lat: 55.758957, lng: 37.584732},
                {lat: 55.763544, lng: 37.587951},
                {lat: 55.771172, lng: 37.600053},
                {lat: 55.773375, lng: 37.610077},
                {lat: 55.773523, lng: 37.626320},
                {lat: 55.771850, lng: 37.637864},
                {lat: 55.768521, lng: 37.649799},
                {lat: 55.763800, lng: 37.656293},
                {lat: 55.756829, lng: 37.657392},
                {lat: 55.742603, lng: 37.654495},
                {lat: 55.731634, lng: 37.638409},
                {lat: 55.729665, lng: 37.614331},
                {lat: 55.738666, lng: 37.586056},
                {lat: 55.746794, lng: 37.582371}
            ];

            let circle = new google.maps.Polygon({
                paths: paths,
                strokeColor: '#00CD00',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#00CD00',
                fillOpacity: 0.35,

            });

            circle.setMap(this.map);
        }
    }

    setScheme(value) {

        for (let key in this.map_button) {
            this.map_button[key] = false;
            this.map_button[value] = true;
        }
        this.open_metro = false;
        document.getElementById('gmap').style.display = 'none';
    }

    setMetro(value) {

        for (let key in this.map_button) {
            this.map_button[key] = false;
            this.map_button[value] = true;
        }
        this.open_metro = true;
        document.getElementById('gmap').style.height = 500 + 'px';
        document.getElementById('gmap').style.width = 100 + '%';
        document.getElementById('gmap').style.display = 'block';

        this.map = new google.maps.Map(document.getElementById('gmap'), {
            center: new google.maps.LatLng(55.758151, 37.624112),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{
                "featureType": "poi",
                "stylers": [
                    {"visibility": "off"}
                ]
            }]
        });

        let iconBase = 'app/sass/images/map-pin.svg';

        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(55.758151, 37.624112),
            map: this.map,
            title: 'ТЦ Никольская Плаза, 1 этаж\nУл. Никольская, 10.',
            icon: iconBase

        });

        let info = 'ТЦ Никольская Плаза, 1 этаж<br/>Ул. Никольская, 10.';

        let infowindow = new google.maps.InfoWindow({
            content: info
        });

        marker.addListener('click', function () {
            infowindow.open(this.map, marker);
        });
    }

    setMaps(value) {

        for (let key in this.map_button) {
            this.map_button[key] = false;
            this.map_button[value] = true;
        }
        this.open_metro = false;

        document.getElementById('gmap').style.height = 500 + 'px';
        document.getElementById('gmap').style.width = 100 + '%';
        document.getElementById('gmap').style.display = 'block';

        this.map = new google.maps.Map(document.getElementById('gmap'), {
            center: new google.maps.LatLng(55.758151, 37.624112),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        let iconBase = 'app/sass/images/map-pin.svg';

        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(55.758151, 37.624112),
            map: this.map,
            title: 'ТЦ Никольская Плаза, 1 этаж\nУл. Никольская, 10.',
            icon: iconBase
        });

        let info = 'ТЦ Никольская Плаза, 1 этаж<br/>Ул. Никольская, 10.';

        let infowindow = new google.maps.InfoWindow({
            content: info
        });

        marker.addListener('click', function () {
            infowindow.open(this.map, marker);
        });
    }

    setLubyanka(value) {

        for (let key in this.metro_button) {
            this.metro_button[key] = false;
            this.metro_button[value] = true;
        }

        this.map = new google.maps.Map(document.getElementById('gmap'), {
            center: new google.maps.LatLng(55.758151, 37.624112),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(this.map);
        let mode: any = 'WALKING';
        directionsService.route({
            origin: new google.maps.LatLng(55.7592634, 37.6281477),
            destination: new google.maps.LatLng(55.758151, 37.624112),
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.WALKING
        }, function (response, status) {
            directionsDisplay.setDirections(response);
        });
        document.body.scrollTop

    }

    setPloshad(value) {

        for (let key in this.metro_button) {
            this.metro_button[key] = false;
            this.metro_button[value] = true;
        }

        this.map = new google.maps.Map(document.getElementById('gmap'), {
            center: new google.maps.LatLng(55.758151, 37.624112),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(this.map);
        let mode: any = 'WALKING';
        directionsService.route({
            origin: new google.maps.LatLng(55.7564497, 37.623354),
            destination: new google.maps.LatLng(55.758151, 37.624112),
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.WALKING
        }, function (response, status) {
            directionsDisplay.setDirections(response);
        });
    }

    setKitai(value) {

        for (let key in this.metro_button) {
            this.metro_button[key] = false;
            this.metro_button[value] = true;
        }

        this.map = new google.maps.Map(document.getElementById('gmap'), {
            center: new google.maps.LatLng(55.758151, 37.624112),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
        let mode: any = 'WALKING';
        directionsDisplay.setMap(this.map);
        directionsService.route({
            origin: new google.maps.LatLng(55.7598848, 37.6270666),
            destination: new google.maps.LatLng(55.758151, 37.624112),
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.WALKING
        }, function (response, status) {

            directionsDisplay.setDirections(response);

        });
    }

    openEvent(id: number, image: any, header: string, start_date: string, end_date: string, main_text: string) {
        this.id = id;
        this.image = image;
        this.header = header;
        this.start_date = start_date;
        this.end_date = end_date;
        this.main_text = main_text;
        this.open_event = true;
        $(document.body).css({overflow: 'hidden'});
        $('.wrapper_banner').css({top: '100px'});
        $('.wrapper_banner').css({height: 'calc(100% - 95px)'});

    }
}
