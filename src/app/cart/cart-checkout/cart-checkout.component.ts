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
	public order: Order;
	
	constructor(private _cartCheckoutService: CartCheckoutService) {
	}
	
	ngOnInit() {
		this.paymentDecision = "now";
		
	}

	
	public getPrice(): number {
		return -1;
	}
	
}
