import {Component, Input, OnInit} from '@angular/core';
import {Order, Payment, Delivery} from 'bl-model';
import {CartCheckoutService} from "./cart-checkout.service";

@Component({
	selector: 'app-cart-checkout',
	templateUrl: './cart-checkout.component.html',
	styleUrls: ['./cart-checkout.component.scss']
})
export class CartCheckoutComponent implements OnInit {
	
	constructor(private _cartCheckoutService: CartCheckoutService) {
	}
	
	ngOnInit() {
		this._cartCheckoutService.onOrderChange().subscribe((order: Order) => {
			console.log('the order changed!', order);
		});
	}
	
	
	public onDeliveryUpdate(delivery: Delivery) {
		console.log('the delivery changed', delivery);
	}
	
	public onPaymentUpdate(payment: Payment) {
		console.log('the payment changed', payment);
	}
	
}
