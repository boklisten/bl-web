import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartCheckoutService } from "../cart-checkout/cart-checkout.service";

@Component({
	selector: "app-cart-checkout",
	templateUrl: "./cart-checkout.component.html",
	styleUrls: ["./cart-checkout.component.scss"]
})
export class CartCheckoutComponent implements OnInit {
	public wait: boolean;
	public placeOrderError: boolean;

	constructor(
		private cartCheckoutService: CartCheckoutService,
		private router: Router
	) {}

	ngOnInit() {}

	onConfirmCheckout() {
		this.wait = true;
		this.placeOrderError = false;
		this.cartCheckoutService
			.placeOrder()
			.then(() => {
				this.wait = false;
				this.placeOrderError = false;
				this.router.navigateByUrl("u/order");
			})
			.catch(() => {
				this.wait = false;
				this.placeOrderError = true;
			});
	}
}
