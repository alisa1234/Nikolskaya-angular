import {Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer} from '@angular/core';
import {UrlAdresses} from '../url_adresses';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {error} from "util";

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, AfterViewInit {

    base_url: string;
    getFeedbackTypes: string;
    sendFeedback: string;
    @ViewChild('scheme') schemeElement: ElementRef;
    @ViewChild('schemeImg') schemeImg: ElementRef;
    map_button: { [index: string]: boolean } = {};
    map: any;
    metro_button: { [index: string]: boolean } = {};
    open_metro: boolean = false;
    open_state: boolean = false;
    types: any;
    form: FormGroup;
    error_text: { [index: string]: string } = {};
    error: { [index: string]: boolean } = {};
    name: string;
    Name: FormControl;
    Email: FormControl;
    Message: FormControl;
    TypeId: FormControl;

    constructor(public render: Renderer, private urlAdresses: UrlAdresses, private http: HttpClient, private fb: FormBuilder) {
        this.base_url = urlAdresses.base_url;
        this.getFeedbackTypes = urlAdresses.getFeddbackTypes;
        this.sendFeedback = urlAdresses.sendFeedback;
        this.map_button['scheme'] = false;
        this.map_button['radius'] = false;
        this.map_button['metro'] = false;
        this.map_button['gmap'] = true;
        this.map_button['maps'] = true;
        this.metro_button['lubyanka'] = false;
        this.metro_button['ploshad'] = false;
        this.metro_button['kitai'] = false;
        this.error['Name'] = false;
        this.error['Email'] = false;
        this.error['Message'] = false;

        http.get(this.base_url + this.getFeedbackTypes)
            .subscribe(data => {
                this.types = data;
                this.form.controls['TypeId'].setValue(this.types[0].Id);
            })
    }

    ngOnInit() {
        this.createControls();
        this.createForm();
    }

    createControls() {
        this.Name = new FormControl('', [
            Validators.required,
        ]);
        this.Email = new FormControl('', [
            Validators.required,
        ]);
        this.Message = new FormControl('', [
            Validators.required,
        ]);
        this.TypeId = new FormControl('')
    }

    createForm() {
        this.form = new FormGroup({
            Name: this.Name,
            Email: this.Email,
            Message: this.Message,
            TypeId: this.TypeId
        })
    }

    ngAfterViewInit() {

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
        infowindow.open(this.map, marker);
        marker.addListener('click', function () {
            infowindow.open(this.map, marker);
        });
    }

    setZoom() {

        this.render.setElementStyle(this.schemeElement.nativeElement.querySelector('.scheme-img'), 'transform', 'scale(2)');
    }

    moveZoom(event) {

        this.render.setElementStyle(this.schemeImg.nativeElement, 'transform-origin',
            ((event.pageX - this.schemeElement.nativeElement.offsetLeft) /
            this.schemeElement.nativeElement.offsetWidth) * 100 + '%' + (event.offsetY / this.schemeElement.nativeElement.offsetHeight) * 100 + '%');
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

    sendContacts() {

        let headers: HttpHeaders = new HttpHeaders();
        // headers = headers.append('Authorization',localStorage.getItem('access_token'));
        headers = headers.append('Content-Type', 'application/json');
        this.http.post(this.base_url + this.sendFeedback, this.form.value, {headers: headers})
            .subscribe(res => {
                    this.open_state = true;
                },
                error => {
                    for (let field in this.error) {
                        this.error[field] = false;
                    }
                    for (let key in error.error.Messages) {
                        this.error[key] = true;
                        this.error_text[key] = error.error.Messages[key];
                    }
                })
    }

}
