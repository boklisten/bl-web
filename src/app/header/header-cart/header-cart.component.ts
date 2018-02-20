import {Component, OnInit} from '@angular/core';
import {CartService} from "../../cart/cart.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'app-header-cart',
	templateUrl: './header-cart.component.html',
	styleUrls: ['./header-cart.component.scss']
})
export class HeaderCartComponent implements OnInit {
	
	constructor(private _cartService: CartService, private _router: Router, private _route: ActivatedRoute) {
	}
	
	ngOnInit() {
	}
	
	displayCart(): boolean {
		return !this._cartService.isEmpty();
	}
	
	public onCartClick() {
		this._router.navigateByUrl('/cart');
	}
	
	
}
