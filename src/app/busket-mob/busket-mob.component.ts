import {Component, OnInit, HostListener, Input, ElementRef, ViewChild, Renderer,AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from "../order.service";
import {BucketModule} from "../bucket-module";
import {RestaurantsListService} from "../restaurants-list/restaurants-list.service";
import { Title }     from '@angular/platform-browser';
declare let $: any;

@Component({
  selector: 'app-busket-mob',
  templateUrl: './busket-mob.component.html',
  styleUrls: ['./busket-mob.component.scss'],
  host: {'class':'root'}
})
export class BusketMobComponent implements OnInit,AfterViewInit {
@Input() _parent:any;
@Input() hidden:boolean=true;
  @ViewChild('bucketItemOther') bucketItemOther: ElementRef;
  constructor(protected route: ActivatedRoute, public orderService: OrderService, protected router: Router) {}
  @HostListener('document:click', ['$event'])

  clickLink(event) {

    if(event.target.closest('.overlay')) {
      this.closeEvent();
    }
  }
  ngOnInit() {
  }
  ngAfterViewInit(){
  }
  addOrder() {
    this.orderService.show_bucket_mob_other = true;
      $(document.body).css('overflow','unset');
      $(document.body).css({position: 'unset'});
      this.router.navigate(["/order"]);

  }
  closeEvent() {
    this.orderService.show_bucket_mob_other = true;
    $(document.body).css('overflow','unset');
    $(document.body).css({position: 'unset'});
  }
  scroll() {
    this.orderService.subs=false;
  }
}
