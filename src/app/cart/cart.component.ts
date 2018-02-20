import {Component, OnInit} from '@angular/core';
import {CartService} from "./cart.service";
import {Item} from "bl-model";

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
	
	constructor(private _cartService: CartService) {
	}
	
	ngOnInit() {
	}
	
	public getCart(): Item[] {
		return this._cartService.getCart();
	}
	
}
