import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { Payment } from "@wizardcoder/bl-model";
import { CartPaymentService } from "../cart-payment.service";
import { CartCheckoutService } from "../../cart-checkout/cart-checkout.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/internal/Subscription";
import { environment } from "../../../../environments/environment";
import { StorageService } from "@wizardcoder/bl-connect";

declare var Dibs: any;

@Component({
	selector: "app-cart-payment-dibs",
	templateUrl: "./cart-payment-dibs.component.html",
	styleUrls: ["./cart-payment-dibs.component.scss"]
})
export class CartPaymentDibsComponent
	implements OnInit, OnDestroy, AfterViewInit {
	public dibsCheckoutOptions: {
		checkoutKey: string;
		paymentId: string;
		containerId?: string;
		language: string;
	};
	waitingForDibs: boolean;
	waitingForDibsInterval: any;
	payment: Payment;
	alert: boolean;

	private paymentChange$: Subscription;

	constructor(
		private _cartPaymentService: CartPaymentService,
		private _cartCheckoutService: CartCheckoutService,
		private _router: Router,
		private _storageService: StorageService
	) {
		this.alert = false;
	}

	ngOnInit() {
		this.payment = this._cartPaymentService.getPayment();
		this.waitingForDibs = true;
		this.checkWaitingForDibs();

		if (this.payment && this.payment.method === "dibs") {
			if (!this.payment.info) {
				this.alert = true;
			} else {
				setTimeout(() => {
					this.createDibsPayment();
				});
			}
		}
	}

	private checkWaitingForDibs() {
		this.waitingForDibsInterval = setInterval(() => {
			let dibsElementIframe = document.getElementById(
				"dibs-checkout-iframe"
			);

			if (dibsElementIframe) {
				this.waitingForDibs = false;
			} else {
				this.waitingForDibs = true;
			}
		}, 100);
	}

	private removeDibsElement() {
		const dibsElement = document.getElementById("dibs-checkout-content");
		if (dibsElement) {
			dibsElement.remove();
		}
	}

	private createDibsElement() {
		const dibsWrapper = document.getElementById("bl-dibs-wrapper");

		if (dibsWrapper) {
			const dibsElement = document.createElement("div");
			dibsElement.setAttribute("id", "dibs-checkout-content");
			dibsWrapper.appendChild(dibsElement);
		}
	}

	ngOnDestroy() {}

	ngAfterViewInit() {}

	private createDibsPayment() {
		this.removeDibsElement();
		this.createDibsElement();

		this.dibsCheckoutOptions = {
			checkoutKey: environment.dibs.checkoutKey,
			paymentId: this.payment.info["paymentId"],
			language: environment.dibs.language
		};

		const checkout = new Dibs.Checkout(this.dibsCheckoutOptions);
		const cartCheckoutService = this._cartCheckoutService;
		const router = this._router;
		const removeStoredIds = this.removeIds;

		this.storeIds(); // must store the ids in case the payment fails

		checkout.on("payment-initialized", function(response) {
			console.log("hi hello!");
			checkout.send("payment-order-finalized", true);
		});

		checkout.on("payment-completed", function(response) {
			cartCheckoutService
				.placeOrder()
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

	private storeIds() {
		this._storageService.add(
			"bl-payment-id",
			this.payment.info["paymentId"]
		);
		this._storageService.add("bl-order-id", this.payment.order);
	}

	private removeIds() {
		try {
			localStorage.removeItem("bl-payment-id");
			localStorage.removeItem("bl-order-id");
		} catch (e) {
			console.log("cartPayment: could not remove stored ids");
		}
	}
}
