import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import {BlApiError, Payment, PaymentMethod, Order} from "@wizardcoder/bl-model";
import {CartPaymentService} from "../cart-payment.service";
import {CartCheckoutService} from "../../cart-checkout/cart-checkout.service";
import {Router} from "@angular/router";
import {CartOrderService} from "../../order/cart-order.service";


declare var Dibs: any;

@Component({
	selector: 'app-cart-payment-dibs',
	templateUrl: './cart-payment-dibs.component.html',
	styleUrls: ['./cart-payment-dibs.component.scss']
})
export class CartPaymentDibsComponent implements OnInit, OnDestroy, AfterViewInit {

	public dibsCheckoutOptions: {
		checkoutKey: string,
		paymentId: string,
		containerId?: string,
		language: string
	};
	payment: Payment;
	alertMsg: string;


	constructor(private _cartPaymentService: CartPaymentService, private _cartCheckoutService: CartCheckoutService, private _router: Router) {
	}

	ngOnInit() {
		this.payment = this._cartPaymentService.getPayment();

		if (this.payment && this.payment.method === 'dibs') {
			if (!this.payment.info) {
				this.setAlert();
			} else {
				this.createDibsPayment();
			}
		}

		this._cartPaymentService.onPaymentChange().subscribe(() => {
			this.alertMsg = null;
			this.payment = this._cartPaymentService.getPayment();
			if (this.payment.method === 'dibs') {
				if (!this.payment.info) {
					this.setAlert();
				} else {
					if (!document.getElementById('dibs-checkout-content')) {
						this.createDibsPayment();
					}
				}
			}
		});
	}

	private setAlert() {
		this.alertMsg = 'Could not create a payment for this order, try again later or click "pay later" to pay this order at branch';
	}

	private createDibsElement() {
		const dibsWrapper = document.getElementById('bl-dibs-wrapper');
		if (dibsWrapper) {
			const dibsElement = document.createElement('div');
			dibsElement.setAttribute('id', 'dibs-checkout-content');
			dibsWrapper.appendChild(dibsElement);
		}
	}

	ngOnDestroy() {
	}

	ngAfterViewInit() {

	}




	createDibsPayment() {
		this.createDibsElement();

		this.dibsCheckoutOptions = {
			checkoutKey: 'test-checkout-key-5d1531c5046e43f9ba5f44a40327d317',
			paymentId: this.payment.info['paymentId'],
			// containerId: 'dibs-complete-checkout',
			language: 'nb-NO'
		};

		const checkout = new Dibs.Checkout(this.dibsCheckoutOptions);

		const cartCheckoutService = this._cartCheckoutService;
		const router = this._router;

		checkout.on('payment-initialized', function (response) {
			checkout.send('payment-order-finalized', true);
		});

		checkout.on('payment-completed', function (response) {
			cartCheckoutService.placeOrder().then(() => {
				router.navigateByUrl('u/order');
			}).catch(() => {
				console.log('cartPaymentService: could not place order after payment was completed');
			});
		});
	}
}
