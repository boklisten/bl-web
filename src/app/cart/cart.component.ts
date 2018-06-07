import {Component, OnInit} from '@angular/core';
import {CartItem, CartService} from "./cart.service";

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


	constructor(private _cartService: CartService) {
	}

	ngOnInit() {
		if (this._cartService.isEmpty()) {
			return;
		}
	}

	public showCart(): boolean {
		return (this.getCart().length > 0);
	}

	public getCart(): CartItem[] {
		return this._cartService.getCart();
	}
}
