import {Component, OnInit} from '@angular/core';
import {CartService} from "../../cart/cart.service";

@Component({
	selector: 'app-cart-go-to-bar',
	templateUrl: './cart-go-to-bar.component.html',
	styleUrls: ['./cart-go-to-bar.component.scss']
})
export class CartGoToBarComponent implements OnInit {
	
	constructor(private _cartService: CartService) {
	}
	
	ngOnInit() {
	}
	
	public numOfItemsInCart(): number {
		return this._cartService.getCart().length;
	}
	
	public totalPriceOfCart(): number {
		return this._cartService.getTotalPrice();
	}
	
	public showCartGoToBar(): boolean {
		return (this.numOfItemsInCart() > 0);
	}
	
}
