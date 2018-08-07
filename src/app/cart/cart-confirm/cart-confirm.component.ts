import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {CartCheckoutService} from "../cart-checkout/cart-checkout.service";
import {Router} from "@angular/router";
import {StorageService} from "@wizardcoder/bl-connect";

declare var Dibs: any;

@Component({
	selector: 'app-cart-confirm',
	templateUrl: './cart-confirm.component.html',
	styleUrls: ['./cart-confirm.component.scss']
})
export class CartConfirmComponent implements OnInit {
	public dibsCheckoutOptions: {
		checkoutKey: string,
		paymentId: string,
		containerId?: string,
		language: string
	};

	constructor(private _cartCheckoutService: CartCheckoutService, private _router: Router, private _storageService: StorageService) {
	}

	ngOnInit() {
		let paymentId = '';
		let orderId = '';

		try {
			paymentId = this._storageService.get('bl-payment-id');
			orderId = this._storageService.get('bl-order-id');
		} catch (e) {
			this._router.navigateByUrl('/cart');
			return;
		}

		this.createDibsElement();
		this.createDibsPayment(paymentId, orderId);
	}

	private createDibsElement() {
		const dibsWrapper = document.getElementById('bl-dibs-wrapper');
		if (dibsWrapper) {
			const dibsElement = document.createElement('div');
			dibsElement.setAttribute('id', 'dibs-checkout-content');
			dibsWrapper.appendChild(dibsElement);
		}
	}

	createDibsPayment(paymentId: string, orderId: string) {
		this.createDibsElement();

		this.dibsCheckoutOptions = {
			checkoutKey: environment.dibs.checkoutKey,
			paymentId: paymentId,
			language: environment.dibs.language
		};

		const checkout = new Dibs.Checkout(this.dibsCheckoutOptions);

		const cartCheckoutService = this._cartCheckoutService;
		const router = this._router;
		const removeStoredIds = this.removeIds;

		checkout.on('payment-initialized', function (response) {
			checkout.send('payment-order-finalized', true);
		});

		checkout.on('payment-completed', function (response) {
			cartCheckoutService.placeOrder(orderId).then(() => {
				removeStoredIds();
				router.navigateByUrl('u/order');
			}).catch(() => {
				console.log('cartPaymentService: could not place order after payment was completed');
			});
		});
	}

	private removeIds() {
		try {
			localStorage.removeItem('bl-payment-id');
			localStorage.removeItem('bl-order-id');
		} catch (e) {
			console.log('cartCheckoutService: could not remove stored ids');
		}
	}
}
