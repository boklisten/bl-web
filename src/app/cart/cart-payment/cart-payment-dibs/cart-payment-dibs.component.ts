import {
	AfterViewInit,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import {Payment} from "@wizardcoder/bl-model";
import {CartPaymentService} from "../cart-payment.service";
import {CartCheckoutService} from "../../cart-checkout/cart-checkout.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/internal/Subscription";
import {environment} from "../../../../environments/environment";


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
	alert: boolean;

	private paymentChange$: Subscription;


	constructor(private _cartPaymentService: CartPaymentService, private _cartCheckoutService: CartCheckoutService, private _router: Router) {
		this.alert = false;
	}

	ngOnInit() {
		this.payment = this._cartPaymentService.getPayment();

		if (this.payment && this.payment.method === 'dibs') {
			if (!this.payment.info) {
				this.alert = true;
			} else {
				this.createDibsPayment();
			}
		}

		this.paymentChange$ = this._cartPaymentService.onPaymentChange().subscribe(() => {
			this.alert = false;
			this.payment = this._cartPaymentService.getPayment();
			if (this.payment.method === 'dibs') {
				if (!this.payment.info) {
					this.alert = true;
				} else {
					const child = document.getElementById('dibs-checkout-content');

					if (child) {
						child.remove();
					}

					setTimeout(() => {
						this.createDibsPayment();
					});
				}
			}
		});
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
		this.paymentChange$.unsubscribe();
	}

	ngAfterViewInit() {

	}




	createDibsPayment() {
		this.createDibsElement();

		this.dibsCheckoutOptions = {
			checkoutKey: environment.dibs.checkoutKey,
			paymentId: this.payment.info['paymentId'],
			language: environment.dibs.language
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
