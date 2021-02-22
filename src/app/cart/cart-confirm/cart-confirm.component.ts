import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import { CartCheckoutService } from "../cart-checkout/cart-checkout.service";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { StorageService } from "@boklisten/bl-connect";
import { CartConfirmService } from "./cart-confirm.service";

@Component({
	selector: "app-cart-confirm",
	templateUrl: "./cart-confirm.component.html",
	styleUrls: ["./cart-confirm.component.scss"],
})
export class CartConfirmComponent implements OnInit {
	public dibsCheckoutOptions: {
		checkoutKey: string;
		paymentId: string;
		containerId?: string;
		language: string;
	};

	public orderNotFoundError: boolean;

	constructor(
		private _cartCheckoutService: CartCheckoutService,
		private _router: Router,
		private _storageService: StorageService,
		private _route: ActivatedRoute,
		private _cartConfirmService: CartConfirmService
	) {}

	ngOnInit() {
		this.orderNotFoundError = false;
		let paymentId = this._route.snapshot.queryParamMap.get("paymentId");

		if (!paymentId) {
			this.setNotFoundError();
		}

		this._cartConfirmService
			.getOrderIdByPaymentId(paymentId)
			.then((orderId) => {
				this._cartConfirmService
					.confirm(orderId)
					.then(() => {
						this._router.navigate(["/u/order"]);
					})
					.catch((e) => {
						this.createDibsElement();
						this.createDibsPayment(paymentId, orderId);
					});
			})
			.catch((e) => {
				console.log("failed to get order by paymentId!", e);
				this.setNotFoundError();
			});
	}

	private setNotFoundError() {
		this.orderNotFoundError = true;
	}

	private createDibsPayment(paymentId: string, orderId: string) {
		this.createDibsElement();

		this.dibsCheckoutOptions = {
			checkoutKey: environment.dibs.checkoutKey,
			paymentId: paymentId,
			language: environment.dibs.language,
		};

		const checkout = new Dibs.Checkout(this.dibsCheckoutOptions);

		const cartCheckoutService = this._cartCheckoutService;
		const router = this._router;
		const removeStoredIds = this.removeIds;

		checkout.on("payment-initialized", function (response) {
			checkout.send("payment-order-finalized", true);
		});

		checkout.on("payment-completed", function (response) {
			cartCheckoutService
				.placeOrder(orderId)
				.then(() => {
					removeStoredIds();
					router.navigateByUrl("u/order");
				})
				.catch(() => {
					console.log(
						"cartPaymentService: could not place order after payment was completed"
					);
				});
		});
	}

	private createDibsElement() {
		const dibsWrapper = document.getElementById("bl-dibs-wrapper");
		if (dibsWrapper) {
			const dibsElement = document.createElement("div");
			dibsElement.setAttribute("id", "dibs-checkout-content");
			dibsWrapper.appendChild(dibsElement);
		}
	}

	private removeIds() {
		try {
			localStorage.removeItem("bl-payment-id");
			localStorage.removeItem("bl-order-id");
		} catch (e) {
			console.log("cartCheckoutService: could not remove stored ids");
		}
	}
}
