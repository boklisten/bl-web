import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CartOrderService } from "../cart-order/cart-order.service";
import { Delivery, Order, Payment } from "@boklisten/bl-model";
import { CartDeliveryService } from "../cart-delivery/cart-delivery.service";
import { CartPaymentService } from "../cart-payment/cart-payment.service";
import { DateService } from "../../date/date.service";

@Component({
	selector: "app-cart-summary",
	templateUrl: "./cart-summary.component.html",
	styleUrls: ["./cart-summary.component.scss"]
})
export class CartSummaryComponent implements OnInit {
	public order: Order;
	public delivery: Delivery;
	public payment: Payment;
	public partlyPaymentTotals: { date: Date; total: number }[];
	public showPartlyPayments: boolean;
	@Output() confirmSummary: EventEmitter<boolean>;

	constructor(
		private _cartOrderService: CartOrderService,
		private _cartDeliveryService: CartDeliveryService,
		private _cartPaymentService: CartPaymentService,
		private _dateService: DateService
	) {
		this.confirmSummary = new EventEmitter<boolean>();
		this.partlyPaymentTotals = [];
	}

	ngOnInit() {
		this.order = this._cartOrderService.getOrder();
		this.delivery = this._cartDeliveryService.getDelivery();
		this.payment = this._cartPaymentService.getPayment();
		this.partlyPaymentTotals = this.getPartlyPaymentTotals(this.order);
		this.showPartlyPayments = this.cartIncludesPartlyPayments();

		this._cartOrderService.onOrderChange().subscribe(() => {
			this.order = this._cartOrderService.getOrder();
			this.partlyPaymentTotals = this.getPartlyPaymentTotals(this.order);
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

	private getPartlyPaymentTotals(
		order: Order
	): { date: Date; total: number }[] {
		let periods = [];
		let periodTotals = {};

		for (const orderItem of order.orderItems) {
			if (orderItem.type === "partly-payment" && orderItem.amount > 0) {
				if (periods.indexOf(orderItem.info.periodType) < 0) {
					// not found
					periods.push(orderItem.info.periodType);
					periodTotals[orderItem.info.periodType] =
						orderItem.info["amountLeftToPay"];
				} else {
					periodTotals[orderItem.info.periodType] +=
						orderItem.info["amountLeftToPay"];
				}
			}
		}

		let partlyPaymentTotals = [];

		for (let period of periods) {
			partlyPaymentTotals.push({
				date: this._dateService.getPartlyPaymentPeriodDate(period),
				total: periodTotals[period]
			});
		}

		return partlyPaymentTotals;
	}

	totalAmount(): number {
		if (this.delivery) {
			return this.delivery.amount + this.order.amount;
		}
		return this.order.amount;
	}

	public cartIncludesPartlyPayments(): boolean {
		for (let orderItem of this.order.orderItems) {
			if (orderItem.type == "partly-payment") {
				return true;
			}
		}
		return false;
	}

	totalAmountIncludingPartlyPayments(): number {
		let partlyPaymentTotal = 0;

		this.order.orderItems.forEach(orderItem => {
			if (orderItem.type == "partly-payment") {
				partlyPaymentTotal += orderItem.info["amountLeftToPay"];
			}
		});

		partlyPaymentTotal += this.totalAmount();

		return partlyPaymentTotal;
	}
}
