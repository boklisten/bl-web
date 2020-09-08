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
		theme?: {
			textColor?: string;
			linkColor?: string;
			panelTextColor?: string;
			panelLinkColor?: string;
			primaryColor?: string;
			buttonRadius?: string;
			buttonTextColor?: string;
			backgroundColor?: string;
			panelColor?: string;
			outlineColor?: string;
			primaryOutlineColor?: string;
		};
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
			let dibsIframeName = "nets-checkout-iframe";

			if (environment.production) {
				dibsIframeName = "dibs-checkout-iframe";
			}

			if (document.getElementById(dibsIframeName)) {
				this.waitingForDibs = false;
			}
		}, 200);
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

		const primaryColor = "#26768f";

		this.dibsCheckoutOptions = {
			checkoutKey: environment.dibs.checkoutKey,
			paymentId: this.payment.info["paymentId"],
			language: environment.dibs.language,
			theme: {
				textColor: "black",
				linkColor: primaryColor,
				panelTextColor: "black",
				panelLinkColor: primaryColor,
				primaryColor: primaryColor,
				buttonRadius: "3px",
				buttonTextColor: "white",
				panelColor: "white",
				outlineColor: primaryColor,
				primaryOutlineColor: primaryColor
			}
		};

		const checkout = new Dibs.Checkout(this.dibsCheckoutOptions);
		const cartCheckoutService = this._cartCheckoutService;
		const router = this._router;
		const removeStoredIds = this.removeIds;

		this.storeIds(); // must store the ids in case the payment fails

		checkout.on("payment-initialized", function(response) {
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
		this._storageService.add("bl-order-id", this.payment.order as string);
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
