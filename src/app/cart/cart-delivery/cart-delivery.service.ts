import {Injectable} from '@angular/core';
import {DeliveryService} from '@wizardcoder/bl-connect';
import {Delivery, Order, DeliveryMethod} from '@wizardcoder/bl-model';
import {Subject, Observable} from "rxjs";
import {CartService} from "../cart.service";
import {CartOrderService} from "../cart-order/cart-order.service";

@Injectable()
export class CartDeliveryService {
	private _deliveryChange$: Subject<Delivery>;
	private _currentDelivery: Delivery;
	private _fromPostalCode: string;
	private _fromPostalCity: string;
	private _fromAddress: string;
	private _deliveryFailure$: Subject<boolean>;

	private _deliveryMethod: DeliveryMethod;
	private _toName: string;
	private _toAddress: string;
	private _toPostalCity: string;
	private _toPostalCode: string;
	private _deliveryReady: boolean;

	constructor(private _deliveryService: DeliveryService, private _cartService: CartService, private _cartOrderService: CartOrderService) {
		this._deliveryChange$ = new Subject();
		this._deliveryMethod = 'branch';

		this._fromPostalCode = '1316';
		this._fromPostalCity = 'OSLO';
		this._fromAddress = 'Postboks 8, 1316 Eiksmarka';

		this._deliveryReady = false;
		this._deliveryFailure$ = new Subject<boolean>();

		const initialOrder = this._cartOrderService.getOrder();

		if (initialOrder) {
			this.addDelivery(initialOrder);
		}

		this.onOrderChange();
		this.onOrderClear();
	}

	public setBranchDelivery() {
		this._deliveryMethod = 'branch';
		this._cartOrderService.reloadOrder(); // this will make a new order to be created, then updates delivery and payment
	}

	public setBringDelivery(toName: string, toAddress: string, toPostalCity: string, toPostalCode: string) {
		this._deliveryMethod = 'bring';
		this._toName = toName;
		this._toAddress = toAddress;
		this._toPostalCity = toPostalCity;
		this._toPostalCode = toPostalCode;

		this._cartOrderService.reloadOrder();
	}

	public onDeliveryChange(): Subject<Delivery> {
		return this._deliveryChange$;
	}

	public getDelivery(): Delivery {
		return this._currentDelivery;
	}

	public onDeliveryFailure(): Observable<boolean> {
		return this._deliveryFailure$;
	}

	public setDeliveryFailure() {
		this._deliveryFailure$.next(true);
	}

	private onOrderChange() { // each time the order changes, should create a new delivery
		this._cartOrderService.onOrderChange().subscribe((order: Order) => {
			this._deliveryReady = false;
			this.addDelivery(order);
		});
	}

	private addDelivery(order: Order) {
		this._deliveryService.add(this.createDelivery(order)).then((addedDelivery: Delivery) => {
			this.setDelivery(addedDelivery);
		}).catch((addDeliveryError) => {
			this._deliveryFailure$.next(true);
		});
	}

	private createDelivery(order: Order): Delivery {
		if (this._deliveryMethod === 'bring') {
			return this.createBringDelivery(order);
		} else if (this._deliveryMethod === 'branch') {
			return this.createBranchDelivery(order);
		}
	}

	private onOrderClear() {
		this._cartOrderService.onClearOrder().subscribe(() => {
			this._currentDelivery = null;
			this._fromPostalCode = '';
			this._deliveryMethod = 'branch';
		});
	}

	private setDelivery(delivery: Delivery) {
		this._currentDelivery = delivery;
		this._deliveryReady = true;
		this._deliveryChange$.next(this._currentDelivery);
	}

	private createBringDelivery(order: Order): Delivery {
		return {
			method: "bring",
			info: {
				from: this._fromPostalCode,
				to: this._toPostalCode,
				shipmentAddress: {
					name: this._toName,
					address: this._toAddress,
					postalCode: this._toPostalCode,
					postalCity: this._toPostalCity
				},
				facilityAddress: {
					address: this._fromAddress,
					postalCode: this._fromPostalCode,
					postalCity: this._fromPostalCity
				}
			},
			order: order.id,
			amount: 0
		} as any;
	}

	private createBranchDelivery(order: Order): Delivery {
		return {
			method: 'branch',
			info: {
				branch: order.branch
			},
			order: order.id,
			amount: 0
		} as any;
	}
}
