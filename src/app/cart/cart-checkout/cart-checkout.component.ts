import {Component, Input, OnInit} from '@angular/core';
import {Order, Payment, Delivery} from 'bl-model';
import {CartCheckoutService} from "./cart-checkout.service";

@Component({
	selector: 'app-cart-checkout',
	templateUrl: './cart-checkout.component.html',
	styleUrls: ['./cart-checkout.component.scss']
})
export class CartCheckoutComponent implements OnInit {
	
	public paymentDecision: "now" | "later";
	
	constructor(private _cartCheckoutService: CartCheckoutService) {
	}
	
	ngOnInit() {
		this.paymentDecision = "now";
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
	
	public getPrice(): number {
		if (!this._cartCheckoutService.getOrder()) {
			return -1;
		}
		return this._cartCheckoutService.getOrder().amount;
	}
	
}
