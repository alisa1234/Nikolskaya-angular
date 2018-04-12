import { Injectable } from '@angular/core';
import {IDishArr} from "./bucket-module";

@Injectable()
export class OrderService {

  order_arr: Array<IDishArr>=[];
  total_price: number = 0;
  constructor() {}

}
