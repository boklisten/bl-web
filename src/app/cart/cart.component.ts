import { Component, OnInit } from "@angular/core";
import { CartItem, CartService } from "./cart.service";
import { CartOrderService } from "./cart-order/cart-order.service";
import { UserService } from "../user/user.service";

@Component({
	selector: "app-cart",
	templateUrl: "./cart.component.html",
	styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
	public isUserValid: boolean;
	public isUserLoggedIn: boolean;
	constructor(
		private _cartService: CartService,
		private _userService: UserService
	) {}

	ngOnInit() {
		if (this._cartService.isEmpty()) {
			return;
		}
		this.isUserValid = true;
		this.checkIfUserIsValid();
		this.isUserLoggedIn = this._userService.loggedIn();
	}

	private checkIfUserIsValid() {
		this._userService
			.isUserDetailValid()
			.then((valid: boolean) => {
				this.isUserValid = valid;
			})
			.catch(() => {
				this.isUserValid = false;
			});
	}

	public showCart(): boolean {
		return (
			this.getCart().length > 0 && this.isUserValid && this.isUserLoggedIn
		);
	}

	public getCart(): CartItem[] {
		return this._cartService.getCart();
	}
}
