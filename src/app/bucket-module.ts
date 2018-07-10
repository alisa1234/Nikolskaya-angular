import {NgModule, ElementRef} from '@angular/core';

export interface IDishArr {
    id: number,
    name: string,
    quantity: number,
    price: number,
    quantity_price: number,
    restaurant_id: number,
    Modifiers: any;
}

@NgModule()
export class BucketModule {
    quantity: number = 1;

    addItem(id: number, arr: Array<IDishArr>, total_price: number, mod_id: number, bucket_item, other_rest, rest_id) {

        this.quantity = 1;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].restaurant_id == rest_id) {
                bucket_item.style.display = 'block';
            }
            if (arr[i].id == id && arr[i].Modifiers.length == 0 || arr[i].id == id && arr[i].Modifiers.length == 0 && mod_id == null) {
                if (typeof arr[i].quantity != 'undefined') {
                    arr[i].quantity++;
                    arr[i].quantity_price = arr[i].price * arr[i].quantity;
                    total_price = total_price + arr[i].price;
                    return {
                        'arr': arr,
                        'total': total_price
                    };
                }
            }
            if (arr[i].id == id && arr[i].Modifiers.length != 0 && arr[i].Modifiers[0].Code == mod_id) {
                if (typeof arr[i].quantity != 'undefined') {
                    arr[i].quantity++;
                    arr[i].quantity_price = arr[i].price * arr[i].quantity;
                    total_price = total_price + arr[i].price;
                    return {
                        'arr': arr,
                        'total': total_price
                    };
                }
            }
        }
    }

    removeItem(id: number, arr: Array<IDishArr>, total_price: number, bucket_item, mod_id: number, other_rest, rest_id) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == id && arr[i].Modifiers.length == 0) {
                arr[i].quantity--;
                arr[i].quantity_price = arr[i].quantity_price - arr[i].price;
                total_price = total_price - arr[i].price;
                if (arr[i].quantity == 0) {
                    if (!other_rest) {
                        if (arr[i].restaurant_id != rest_id && arr[i].Modifiers.length == 0 || arr[i].id == id && arr[i].Modifiers.length == 0 && mod_id == null) {
                            arr.splice(i, 1);
                            if (arr.length == 0) {
                                bucket_item.style.display = 'none';
                            } else {
                                bucket_item.children[i + 1].remove();
                            }
                        } else {
                            arr.splice(i, 1);
                            if (arr.length == 0) {
                                bucket_item.style.display = 'none';
                            } else {
                                bucket_item.children[i + 1].remove();
                            }
                        }
                    }
                }
                return {
                    'arr': arr,
                    'total': total_price
                };
            }
            if (arr[i].id == id && arr[i].Modifiers.length != 0 && arr[i].Modifiers[0].Code == mod_id) {
                arr[i].quantity--;
                arr[i].quantity_price = arr[i].quantity_price - arr[i].price;
                total_price = total_price - arr[i].price;
                if (arr[i].quantity == 0) {
                    if (!other_rest) {
                        if (arr[i].restaurant_id != rest_id && arr[i].Modifiers.length == 0 || arr[i].id == id && arr[i].Modifiers.length == 0 && mod_id == null) {
                            arr.splice(i, 1);
                            if (arr.length == 0) {
                                bucket_item.style.display = 'none';
                            } else {
                                bucket_item.children[i + 1].remove();
                            }
                        } else {
                            arr.splice(i, 1);
                            if (arr.length == 0) {
                                bucket_item.style.display = 'none';
                            } else {
                                bucket_item.children[i + 1].remove();
                            }
                        }
                    }
                }
                return {
                    'arr': arr,
                    'total': total_price
                };
            }
        }
    }
}
