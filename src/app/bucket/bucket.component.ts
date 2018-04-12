import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { OrderService } from '../order.service';
import { BucketModule } from '../bucket-module';
import { HeaderService } from '../header/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent implements OnInit {
  @ViewChild ('bucketItem') bucket_item: ElementRef;

  constructor(private route: Router,public orderService:OrderService,private bucketModule:BucketModule, private headerService:HeaderService) { }

  ngOnInit() {}

  addItem(id) {
    let result = this.bucketModule.addItem(id,this.orderService.order_arr,this.orderService.total_price);
    this.orderService.order_arr = result.arr;
    this.orderService.total_price = result.total;
  }

  removeItem(id) {
    let result = this.bucketModule.removeItem(id,this.orderService.order_arr,this.orderService.total_price,this.bucket_item);
    this.orderService.order_arr = result.arr;
    this.orderService.total_price = result.total;
  }

  makeOrder() {
    if(this.headerService.login == true) {
     this.route.navigate(['/order']);
    }else {
      this.route.navigate(['/login']);
      this.headerService.getUrl(this.route.url);
    }
  }
}
