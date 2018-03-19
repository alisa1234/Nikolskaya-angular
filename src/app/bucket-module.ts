import {NgModule, ElementRef} from '@angular/core';
export interface IDishArr {
    id: number,
    name: string,
    quantity: number,
    price: number,
    quantity_price: number,
    restaurant_id: number
}
export interface IDishArrs extends Array<IDishArr> {}
@NgModule()
export class BucketModule {
    quantity: number = 1;

    addItem(id:number,arr:Array<IDishArr>,total_price: number) {
        this.quantity = 1;
        for(let i=0; i<arr.length;i++) {
            if(arr[i].id == id) {
                if(typeof arr[i].quantity !='undefined'){
                        arr[i].quantity ++;
                        arr[i].quantity_price=arr[i].price*arr[i].quantity;
                        total_price=total_price + arr[i].price;
                        return {
                             'arr':arr,
                            'total':total_price};
                }

            }

        }


    }
    removeItem(id:number,arr:Array<IDishArr>,total_price: number, bucket_item: ElementRef) {

        for(let i=0; i<arr.length;i++) {
            if(arr[i].id == id) {
                arr[i].quantity --;
                arr[i].quantity_price=arr[i].quantity_price-arr[i].price;
                total_price=total_price - arr[i].price;
                if(arr[i].quantity == 0) {
                    bucket_item.nativeElement.children[i].remove();
                    arr.splice(i,1);
                }
                return {
                    'arr':arr,
                    'total':total_price};

            }

        }
    }
}
