import { Component, OnInit } from "@angular/core";
import { CartItem, CartService } from "./cart.service";
import { CartOrderService } from "./cart-order/cart-order.service";
import { UserService } from "../user/user.service";

@Component({
	selector: "app-cart",
	templateUrl: "./cart.component.html",
	styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
	public cartSize: number;
	constructor(
		private _cartService: CartService,
		private _userService: UserService
	) {}

	ngOnInit() {
		this.cartSize = this._cartService.getSize();

		this._cartService.onCartChange().subscribe(() => {
			this.cartSize = this._cartService.getSize();
		});
	}

	getCart() {
		return this._cartService.getCart();
	}
}
