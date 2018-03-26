import {Component, Input, OnInit} from '@angular/core';
import {Order, Payment, Delivery} from 'bl-model';
import {CartCheckoutService} from "./cart-checkout.service";
import {CartOrderService} from "../order/cart-order.service";

@Component({
	selector: 'app-cart-checkout',
	templateUrl: './cart-checkout.component.html',
	styleUrls: ['./cart-checkout.component.scss']
})
export class CartCheckoutComponent implements OnInit {
	
	public paymentDecision: "now" | "later";
	public order: Order;
	
	constructor(private _cartCheckoutService: CartCheckoutService, private _cartOrderService: CartOrderService) {
	}
	
	ngOnInit() {
		this.paymentDecision = "now";
		this.order = this._cartOrderService.getOrder();
		
		this._cartOrderService.onOrderChange().subscribe(() => {
			this.order = this._cartOrderService.getOrder();
		});
		
	}

	
	public getPrice(): number {
		return this.order.amount;
	}
	
}
