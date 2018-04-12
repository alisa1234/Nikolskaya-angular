import { Component, OnInit, ViewChild, AfterViewInit,Renderer,ElementRef } from '@angular/core';
import { EventsListService } from '../events-list/events-list.service'
import { RestaurantsListService } from '../restaurants-list/restaurants-list.service'
import { UrlAdresses } from "../url_adresses";
import { HttpClient } from '@angular/common/http';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit {

  base_url: string;
  getAbout: string;
  restaurant_list: any;
  events_list: any;
  restaurant_list_length: number;
  events_list_length: number;
  radius: boolean = false;
  scheme: boolean = false;
  @ViewChild('scheme') schemeElement:ElementRef;
  @ViewChild('schemeImg') schemeImg:ElementRef;
  map_button: {[index: string]: boolean} ={};
  map: any;

  constructor(private http: HttpClient,public eventsListService:EventsListService, public restaurantsListService:RestaurantsListService, private urlAdresses:UrlAdresses,public render: Renderer) {

    this.base_url = urlAdresses.base_url;
    this.getAbout =  urlAdresses.getAbout;
    this.map_button['scheme'] = false;
    this.map_button['radius'] = false;
    this.map_button['metro'] = false;
    this.map_button['gmap'] = true;
    this.map_button['maps'] = true;

    if(localStorage.length==0 || typeof JSON.parse(localStorage.getItem('events_list')) == 'undefined'|| JSON.parse(localStorage.getItem('events_list')) === null) {
      this.eventsListService.getEventsList();
      this.eventsListService.change.subscribe(data=>{
        this.events_list = data;
        this.events_list_length = data.length;
      })
    } else {
        this.events_list = JSON.parse(localStorage.getItem('events_list'));
        this.events_list_length = this.events_list.length;
    }

    if(localStorage.length==0 || typeof JSON.parse(localStorage.getItem('restaurants_list')) == 'undefined' || JSON.parse(localStorage.getItem('events_list')) === null) {
      this.restaurantsListService.getRestaurantsList();
      this.restaurantsListService.change.subscribe(data=>{
        this.restaurant_list = data;
        this.restaurant_list_length = data.length;
      })
    } else {
        this.restaurant_list = JSON.parse(localStorage.getItem('restaurants_list'));
        this.restaurant_list_length = this.restaurant_list.length;
    }

    this.http.get(this.base_url+this.getAbout)
        .subscribe(data=>{})
  }

  ngOnInit() {}

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

    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });
  }

  setZoom() {

    this.render.setElementStyle(this.schemeElement.nativeElement.querySelector('.scheme-img'),'transform','scale(2)');
  }

  moveZoom(event) {
    this.render.setElementStyle(this.schemeImg.nativeElement, 'transform-origin',
        ((event.pageX-this.schemeElement.nativeElement.offsetLeft)/
        this.schemeElement.nativeElement.offsetWidth)*100+'%' + (event.offsetY/this.schemeElement.nativeElement.offsetHeight)*100+'%');
  }

  removeZoom(){

    this.render.setElementStyle(this.schemeElement.nativeElement.querySelector('.scheme-img'),'transform','scale(1)')
  }
  setCircle(value) {

    if(this.map_button[value] == false){
      for(let key in this.map_button) {
        this.map_button[key] = false;
        this.map_button[value] = true;
      }

      document.getElementById('gmap').style.height = 500 + 'px';
      document.getElementById('gmap').style.width = 100 + '%';
      document.getElementById('gmap').style.display = 'block';

      this.map = new google.maps.Map(document.getElementById('gmap'), {
        center: new google.maps.LatLng(55.758151, 37.624112),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [ {
          "featureType": "poi",
          "stylers": [
            { "visibility": "off" }
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

      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
      });

      let paths=[
        {lat: 55.746794, lng: 37.582371},
        {lat: 55.758957, lng: 37.584732},
        {lat: 55.763544 , lng: 37.587951 },
        {lat: 55.771172 , lng:  37.600053 },
        {lat: 55.773375 , lng: 37.610077},
        {lat: 55.773523 , lng: 37.626320 },
        {lat: 55.771850 , lng: 37.637864},
        {lat: 55.768521 , lng: 37.649799 },
        {lat: 55.763800 , lng:  37.656293 },
        {lat: 55.756829 , lng: 37.657392 },
        {lat: 55.742603 , lng: 37.654495 },
        {lat: 55.731634 , lng: 37.638409 },
        {lat: 55.729665 , lng: 37.614331 },
        {lat: 55.738666 , lng: 37.586056 },
        {lat: 55.746794, lng: 37.582371}
      ];

    let circle =  new google.maps.Polygon({
      paths: paths,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,

    });

    circle.setMap(this.map);
  }
  }
  setScheme(value) {

    for(let key in this.map_button) {
      this.map_button[key] = false;
      this.map_button[value] = true;
    }
    document.getElementById('gmap').style.display = 'none';
  }

  setMetro(value) {

    for(let key in this.map_button) {
      this.map_button[key] = false;
      this.map_button[value] = true;
    }

    document.getElementById('gmap').style.height = 500 + 'px';
    document.getElementById('gmap').style.width = 100 + '%';
    document.getElementById('gmap').style.display = 'block';

    this.map = new google.maps.Map(document.getElementById('gmap'), {
      center: new google.maps.LatLng(55.758151, 37.624112),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [ {
        "featureType": "poi",
        "stylers": [
          { "visibility": "off" }
        ]
      }]
    });

    let iconBase = 'app/sass/images/map-pin.svg';

    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(55.758151, 37.624112),
      map: this.map,
      title: 'ТЦ Никольская Плаза, 1 этаж\nУл. Никольская, 10.',
      icon:iconBase

    });

    let info = 'ТЦ Никольская Плаза, 1 этаж<br/>Ул. Никольская, 10.';

    let infowindow = new google.maps.InfoWindow({
      content: info
    });

    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });
  }

  setMaps(value) {

    for(let key in this.map_button) {
      this.map_button[key] = false;
      this.map_button[value] = true;
    }

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
      icon:iconBase
    });

    let info = 'ТЦ Никольская Плаза, 1 этаж<br/>Ул. Никольская, 10.';

    let infowindow = new google.maps.InfoWindow({
      content: info
    });

    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });
  }
}
