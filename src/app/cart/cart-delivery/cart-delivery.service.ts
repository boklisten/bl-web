import {Injectable} from '@angular/core';
import {BranchStoreService} from "../../branch/branch-store.service";
import {DeliveryService} from 'bl-connect';
import {Delivery, BlApiError, Order} from 'bl-model';
import {Subject} from "rxjs/Subject";
import {del} from "selenium-webdriver/http";
import {CartCheckoutService} from "../cart-checkout/cart-checkout.service";
import {CartService} from "../cart.service";
import {CartOrderService} from "../order/cart-order.service";

@Injectable()
export class CartDeliveryService {
	private _deliveryChange$: Subject<Delivery>;
	private _orderChange$: Subject<Order>;
	private _currentDelivery: Delivery;
	private _initialConfigDone: boolean;
	
	constructor(private _branchStoreService: BranchStoreService, private _deliveryService: DeliveryService,
				private _cartService: CartService, private _cartOrderService: CartOrderService) {
		
		this._deliveryChange$ = new Subject();
		this._orderChange$ = new Subject();
		this._initialConfigDone = false;
		
		this._cartOrderService.onOrderChange().subscribe((order: Order) => {
			console.log('cartDeliveryService: orderUpdated', order);
			
			if (!this._initialConfigDone) {
				this.updateDeliveryBranch().then((addedDelivery: Delivery) => {
					console.log('the added delivery');
					this._currentDelivery = addedDelivery;
					this._initialConfigDone = false;
					this._deliveryChange$.next(this._currentDelivery);
				}).catch((blApiError: BlApiError) => {
					console.log('cartDeliveryService: could not add initial delivery from api');
				});
			}
			this._orderChange$.next(order);
		});
	}
	
	public onOrderChange(): Subject<Order> {
		return this._orderChange$;
	}
	
	public onDeliveryChange(): Subject<Delivery> {
		return this._deliveryChange$;
	}
	
	public getDelivery(): Delivery {
		return this._currentDelivery;
	}
	
	public updateDeliveryBring(toPostal: string): Promise<Delivery> {
		const bringDeliveryPatch = this.createBringDelivery(toPostal);
		return this.addOrUpdateDelivery(bringDeliveryPatch);
	}
	
	public updateDeliveryBranch(): Promise<Delivery> {
		const branchDeliveryPatch = this.createBranchDelivery();
		return this.addOrUpdateDelivery(branchDeliveryPatch);
	}
	
	private addOrUpdateDelivery(delivery: Delivery): Promise<Delivery> {
		if (this._currentDelivery) {
			return this._deliveryService.update(this._currentDelivery.id, delivery).then((updatedDelivery: Delivery) => {
				this._deliveryChange$.next(updatedDelivery);
				this._currentDelivery = updatedDelivery;
				return updatedDelivery;
			}).catch((blApiErr: BlApiError) => {
				console.log('cartDeliveryService: could not update delivery', blApiErr);
				return Promise.reject(blApiErr);
			});
		} else {
			return this._deliveryService.add(delivery).then((addedDelivery: Delivery) => {
				this._currentDelivery = addedDelivery;
				this._deliveryChange$.next(addedDelivery);
				return addedDelivery;
			}).catch((blApiErr: BlApiError) => {
				console.log('cartDeliveryService: could not add delivery', blApiErr);
				return Promise.reject(blApiErr);
			});
		}
	}
	
	private createBringDelivery(toPostal: string): any {
		const order = this._cartOrderService.getOrder();
		return {
			method: "bring",
			info: {
				from: '0560',
				to: toPostal
			},
			order: order.id,
			amount: 0
		};
	}
	
	private createBranchDelivery(): any {
		const order = this._cartOrderService.getOrder();
		return {
			method: 'branch',
			info: {
				branch: this._branchStoreService.getCurrentBranch().id
			},
			order: order.id,
			amount: 0
		};
	}
}
