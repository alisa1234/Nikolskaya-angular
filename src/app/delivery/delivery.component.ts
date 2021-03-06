import { Component, OnInit, ViewChild, ElementRef, AfterViewInit,Renderer} from '@angular/core';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})

export class DeliveryComponent implements OnInit, AfterViewInit {

  payments:boolean = false;
  @ViewChild('scheme') schemeElement:ElementRef;
  @ViewChild('schemeImg') schemeImg:ElementRef;
  map_button: {[index: string]: boolean} ={};
  map: any;

  constructor(public render: Renderer) {
    this.map_button['scheme'] = false;
    this.map_button['radius'] = true;
    this.map_button['metro'] = false;
    this.map_button['gmap'] = false;
  }

  ngOnInit() {}

  ngAfterViewInit() {

    this.setCircle();
  }
  setZoom() {

    this.render.setElementStyle(this.schemeElement.nativeElement.querySelector('.scheme-img'),'transform','scale(2)');
  }
  moveZoom(event) {

    this.render.setElementStyle(this.schemeImg.nativeElement, 'transform-origin',
        ((event.pageX-this.schemeElement.nativeElement.offsetLeft)/
        this.schemeElement.nativeElement.offsetWidth)*100+'%'+ (event.offsetY/this.schemeElement.nativeElement.offsetHeight)*100+'%');
  }
  removeZoom(){

    this.render.setElementStyle(this.schemeElement.nativeElement.querySelector('.scheme-img'),'transform','scale(1)')
  }
  setCircle() {

      document.getElementById('gmap').style.height = 500 + 'px';
      document.getElementById('gmap').style.width = 100 + '%';
      document.getElementById('gmap').style.display = 'block';

      this.map = new google.maps.Map(document.getElementById('gmap'), {
        center: new google.maps.LatLng(55.758151, 37.624112),
        zoom: 12,
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
    infowindow.open(this.map, marker);
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
      strokeColor: '#00CD00',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#00CD00',
      fillOpacity: 0.35,
    });

    circle.setMap(this.map);
  }

  OpenPayments() {
    if(this.payments == true) {
      this.payments = false;
    }else this.payments = true;

  }
}
