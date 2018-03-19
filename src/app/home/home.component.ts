import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {EventsListService} from '../events-list/events-list.service'
import {RestaurantsListService} from '../restaurants-list/restaurants-list.service'
import {UrlAdresses} from "../url_adresses";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  base_url: string;
  getAbout: string;
  lat: number = 55.758611315793935;
  lng: number = 37.62465476989747;
  zoom: number = 14;
  restaurant_list: any;
  events_list: any;
  restaurant_list_length: number;
  events_list_length: number;
  radius: boolean = false;
  about_title: string;
  about_text: string;
  scheme: boolean = false;

  @ViewChild('gmap') gmapElement: any;
  map_button: {[index: string]: boolean} ={};
  map: any;

  constructor(private http: HttpClient,public eventsListService:EventsListService, public restaurantsListService:RestaurantsListService, private urlAdresses:UrlAdresses) {

    this.base_url = urlAdresses.base_url;
    this.getAbout =  urlAdresses.getAbout;
    this.map_button['scheme'] = false;
    this.map_button['radius'] = false;
    this.map_button['gmap'] = true;
    if(localStorage.length==0 || typeof JSON.parse(localStorage.getItem('events_list')) == 'undefined'|| JSON.parse(localStorage.getItem('events_list')) === null) {
      this.eventsListService.getEventsList();
      this.eventsListService.change.subscribe(data=>{
        this.events_list = data;
        this.events_list_length = data.length;

      })
    }else {
      this.events_list = JSON.parse(localStorage.getItem('events_list'));
      this.events_list_length = this.events_list.length;

    }

    if(localStorage.length==0 || typeof JSON.parse(localStorage.getItem('restaurants_list')) == 'undefined' || JSON.parse(localStorage.getItem('events_list')) === null) {
      this.restaurantsListService.getRestaurantsList();
      this.restaurantsListService.change.subscribe(data=>{
        this.restaurant_list = data;
        this.restaurant_list_length = data.length;

      })

    }else {
      this.restaurant_list = JSON.parse(localStorage.getItem('restaurants_list'));
      this.restaurant_list_length = this.restaurant_list.length;

    }

    this.http.get(this.base_url+this.getAbout)
        .subscribe(data=>{
        })

  }

  ngOnInit() {
  }
  ngAfterViewInit() {
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
      center: new google.maps.LatLng(55.758611315793935, 37.62465476989747),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(55.758611315793935, 37.62465476989747),
      map: this.map,
      title: 'Никольская, 10'
    });
    let circle =  new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      center: new google.maps.LatLng(55.758611315793935, 37.62465476989747),
      map: this.map,
      radius: 3000,

    });
  }
  }
  setScheme(value) {
    for(let key in this.map_button) {
      this.map_button[key] = false;
      this.map_button[value] = true;
    }
    document.getElementById('gmap').style.display = 'none';
  }

}
