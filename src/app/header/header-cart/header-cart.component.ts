import {Component, OnInit} from '@angular/core';
import {CartService} from "../../cart/cart.service";

@Component({
	selector: 'app-header-cart',
	templateUrl: './header-cart.component.html',
	styleUrls: ['./header-cart.component.scss']
})
export class HeaderCartComponent implements OnInit {
	
	constructor(private _cartService: CartService) {
	}
	
	ngOnInit() {
	}
	
	displayCart(): boolean {
		return !this._cartService.isEmpty();
	}
	
}
