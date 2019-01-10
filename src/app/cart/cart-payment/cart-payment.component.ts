import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewChild
} from "@angular/core";
import { CartPaymentService } from "./cart-payment.service";
import { Payment } from "@wizardcoder/bl-model";
import { CartOrderService } from "../cart-order/cart-order.service";
import { CartDeliveryService } from "../cart-delivery/cart-delivery.service";
import { Observable } from "rxjs/internal/Observable";
import { Subscription } from "rxjs/internal/Subscription";

@Component({
	selector: "app-cart-payment",
	templateUrl: "./cart-payment.component.html",
	styleUrls: ["./cart-payment.component.scss"]
})
export class CartPaymentComponent implements OnInit, OnDestroy {
	@Output() error: EventEmitter<Error>;
	public showDibsPayment: boolean;
	public paymentMethod: "later" | "dibs";
	public currentPayment: Payment;
	private dibsCheckoutChild: any;
	public failure: boolean;
	public wait: boolean;

	constructor(
		private _cartPaymentService: CartPaymentService,
		private _cartOrderService: CartOrderService,
		private _cartDeliveryService: CartDeliveryService
	) {
		this.paymentMethod = "dibs";
		this.failure = false;
		this.error = new EventEmitter<Error>();
	}

	ngOnInit() {
		this.removeDibsCheckout();
		this._cartPaymentService.clear();
		this.wait = true;

		this._cartPaymentService
			.createPayment()
			.then(() => {
				this.wait = false;
			})
			.catch(createPaymentError => {
				this.wait = false;
				this.error.emit(createPaymentError);
			});
	}

	ngOnDestroy() {
		this.removeDibsCheckout();
	}

	private removeDibsCheckout() {
		this.dibsCheckoutChild = document.getElementById(
			"dibs-checkout-content"
		);

		if (this.dibsCheckoutChild) {
			this.dibsCheckoutChild.remove();
		}
	}
}
