import { Injectable } from '@angular/core';
import {IDishArr} from "./bucket-module";

@Injectable()

export class OrderService {

  order_arr: Array<IDishArr>=[];
  order_arr_bucket={};
  order_arr_bucket_keys= [];
  total_price: number = 0;
  show_bucket_mob: boolean = false;
  show_bucket_mob_other: boolean = true;
  arr_bucket_length;
  dishes_arr=[];
  other_rest:any;
  quantity: { [index: string]: number } = {};
  subs: boolean = false;
  constructor() {}

}
