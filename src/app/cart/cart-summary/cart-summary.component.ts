import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CartOrderService } from "../cart-order/cart-order.service";
import { Delivery, Order, Payment } from "@wizardcoder/bl-model";
import { CartDeliveryService } from "../cart-delivery/cart-delivery.service";
import { CartPaymentService } from "../cart-payment/cart-payment.service";

@Component({
	selector: "app-cart-summary",
	templateUrl: "./cart-summary.component.html",
	styleUrls: ["./cart-summary.component.scss"]
})
export class CartSummaryComponent implements OnInit {
	public order: Order;
	public delivery: Delivery;
	public payment: Payment;
	@Output() confirmSummary: EventEmitter<boolean>;

	constructor(
		private _cartOrderService: CartOrderService,
		private _cartDeliveryService: CartDeliveryService,
		private _cartPaymentService: CartPaymentService
	) {
		this.confirmSummary = new EventEmitter<boolean>();
	}

	ngOnInit() {
		this.order = this._cartOrderService.getOrder();
		this.delivery = this._cartDeliveryService.getDelivery();
		this.payment = this._cartPaymentService.getPayment();

		this._cartOrderService.onOrderChange().subscribe(() => {
			this.order = this._cartOrderService.getOrder();
		});

		this._cartDeliveryService.onDeliveryChange().subscribe(() => {
			this.delivery = this._cartDeliveryService.getDelivery();
		});

		this._cartPaymentService.onPaymentChange().subscribe(() => {
			this.payment = this._cartPaymentService.getPayment();
		});
	}

	onConfirmSummary() {
		this.confirmSummary.emit(true);
	}

	totalAmount(): number {
		if (this.delivery) {
			return this.delivery.amount + this.order.amount;
		}
		return this.order.amount;
	}
}
