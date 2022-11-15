import { Component, OnInit } from "@angular/core";
import { CartItem, CartService } from "./cart.service";
import { CartOrderService } from "./cart-order/cart-order.service";
import { UserService } from "../user/user.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-cart",
	templateUrl: "./cart.component.html",
	styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
	public cartSize: number;
	public showPartlyPaymentInfo = false;
	public isUserDetailValid = true;

	constructor(
		private _cartService: CartService,
		private _userService: UserService,
		private _router: Router
	) {}

	ngOnInit() {
		this.cartSize = this._cartService.getSize();

		this._userService.isUserDetailValid().then((isValid) => {
			this.isUserDetailValid = isValid;
		});

		this._cartService.onCartChange().subscribe(() => {
			this.cartSize = this._cartService.getSize();
		});

		this.showPartlyPaymentInfo = this._cartService.hasPartlyPaymentItems();
	}

	public navigateToUserDetails() {
		this._router.navigate(["/u/edit"]);
	}

	getCart() {
		return this._cartService.getCart();
	}
}
