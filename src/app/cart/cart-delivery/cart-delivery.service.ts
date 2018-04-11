import {Injectable} from '@angular/core';
import {BranchStoreService} from "../../branch/branch-store.service";
import {DeliveryService} from '@wizardcoder/bl-connect';
import {Delivery, BlApiError, Order, DeliveryMethod} from '@wizardcoder/bl-model';
import {Subject} from "rxjs/Subject";
import {CartService} from "../cart.service";
import {CartOrderService} from "../order/cart-order.service";

@Injectable()
export class CartDeliveryService {
	private _deliveryChange$: Subject<Delivery>;
	private _currentDelivery: Delivery;
	private _fromPostalCode: string;
	
	private _deliveryMethod: DeliveryMethod;
	private _toPostalCode: string;
	
	constructor(private _deliveryService: DeliveryService, private _cartService: CartService, private _cartOrderService: CartOrderService) {
		this._deliveryChange$ = new Subject();
		this._deliveryMethod = 'branch';
		this._fromPostalCode = '1316';
		
		const initialOrder = this._cartOrderService.getOrder();
		
		if (initialOrder) {
			this.createDelivery(initialOrder);
		}
		
		this.onOrderChange();
		this.onOrderClear();
		
	}
	
	public updateDeliveryBranch() {
		this._deliveryMethod = 'branch';
		const order = this._cartOrderService.getOrder();
		this.updateDeliveryBasedOnDeliveryMethod(order);
	}
	
	public updateDeliveryBring(toPostal: string) {
		this._toPostalCode = toPostal;
		this._deliveryMethod = 'bring';
		const order = this._cartOrderService.getOrder();
		this.updateDeliveryBasedOnDeliveryMethod(order);
	}
	
	private onOrderChange() {
		this._cartOrderService.onOrderChange().subscribe((order: Order) => {
			if (!this._currentDelivery) {
				this.createDelivery(order);
			} else {
				this.updateDeliveryBasedOnDeliveryMethod(order);
			}
		});
	}
	
	private onOrderClear() {
		this._cartOrderService.onClearOrder().subscribe(() => {
			this._currentDelivery = null;
			this._fromPostalCode = '';
		});
	}
	
	private updateDeliveryBasedOnDeliveryMethod(order: Order) {
		let deliveryPatch: any;
		
		if (this._deliveryMethod === 'branch') {
			deliveryPatch = this.createBranchDelivery(order);
		} else if (this._deliveryMethod === 'bring') {
			deliveryPatch = this.createBringDelivery(order, this._toPostalCode);
		}
		
		this._deliveryService.update(this._currentDelivery.id, deliveryPatch).then((updatedDelivery: Delivery) => {
			this.setDelivery(updatedDelivery);
		}).catch((updatedDeliveryError) => {
			console.log('cartDeliveryService: could not update delivery' , updatedDeliveryError);
		});
		
	}
	
	private createDelivery(order: Order) {
		this._deliveryService.add(this.createBranchDelivery(order)).then((addedDelivery: Delivery) => {
			this.setDelivery(addedDelivery);
		}).catch((addDeliveryError) => {
			console.log('cartDeliveryService: could not add delivery', addDeliveryError);
		});
	}
	
	private setDelivery(delivery: Delivery) {
		this._currentDelivery = delivery;
		this._deliveryChange$.next(this._currentDelivery);
	}
	
	public clearDelivery() {
		this._currentDelivery = null;
	}
	
	public onDeliveryChange(): Subject<Delivery> {
		return this._deliveryChange$;
	}
	
	public getDelivery(): Delivery {
		return this._currentDelivery;
	}
	
	private createBringDelivery(order: Order, toPostal: string): any {
		return {
			method: "bring",
			info: {
				from: this._fromPostalCode,
				to: toPostal
			},
			order: order.id,
			amount: 0
		};
	}
	
	private createBranchDelivery(order: Order): any {
		return {
			method: 'branch',
			info: {
				branch: order.branch
			},
			order: order.id,
			amount: 0
		};
	}
}
