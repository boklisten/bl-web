import {Component, OnInit} from '@angular/core';
import {CartService} from "../../cart/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
	selector: 'app-header-cart',
	templateUrl: './header-cart.component.html',
	styleUrls: ['./header-cart.component.scss']
})
export class HeaderCartComponent implements OnInit {
	
	constructor(private _cartService: CartService, private _router: Router, private _route: ActivatedRoute, private _location: Location) {
	}
	
	ngOnInit() {
	}
	
	displayCart(): boolean {
		return (!this._cartService.isEmpty() && (this._location.path().indexOf('cart') <= -1));
	}
	
	displaySelected(): boolean {
		return (this._location.path().indexOf('cart') > -1);
	}
	
	public onCartClick() {
		this._router.navigateByUrl('/cart');
	}
	
	
}
