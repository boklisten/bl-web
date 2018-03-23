import {Injectable} from '@angular/core';
import {BranchStoreService} from "../../branch/branch-store.service";
import {DeliveryService} from 'bl-connect';
import {Delivery, BlApiError, Order} from 'bl-model';
import {Subject} from "rxjs/Subject";
import {del} from "selenium-webdriver/http";

@Injectable()
export class CartDeliveryService {
	private _deliveryChange$: Subject<Delivery>;
	private _currentDelivery: Delivery;
	
	constructor(private _branchStoreService: BranchStoreService, private _deliveryService: DeliveryService) {
		this._deliveryChange$ = new Subject();
	}
	
	public onDeliveryChange(): Subject<Delivery> {
		return this._deliveryChange$;
	}
	
	public updateDeliveryBring(order: Order, toPostal: string): Promise<Delivery> {
		const bringDeliveryPatch = this.createBringDelivery(order, toPostal);
		return this.addOrUpdateDelivery(bringDeliveryPatch);
	}
	
	public updateDeliveryBranch(order: Order): Promise<Delivery> {
		const branchDeliveryPatch = this.createBranchDelivery(order);
		return this.addOrUpdateDelivery(branchDeliveryPatch);
	}
	
	private addOrUpdateDelivery(delivery: Delivery): Promise<Delivery> {
		if (this._currentDelivery) {
			return this._deliveryService.update(this._currentDelivery.id, delivery).then((updatedDelivery: Delivery) => {
				this._deliveryChange$.next(updatedDelivery);
				this._currentDelivery = updatedDelivery;
				return updatedDelivery;
			}).catch((blApiErr: BlApiError) => {
				console.log('cartDeliveryComponent: could not update delivery', blApiErr);
				return Promise.reject(blApiErr);
			});
		} else {
			return this._deliveryService.add(delivery).then((addedDelivery: Delivery) => {
				this._deliveryChange$.next(addedDelivery);
				this._currentDelivery = addedDelivery;
				return addedDelivery;
			}).catch((blApiErr: BlApiError) => {
				console.log('cartDeliveryComponent: could not add delivery', blApiErr);
				return Promise.reject(blApiErr);
			});
		}
	}
	
	private createBringDelivery(order: Order, toPostal: string): any {
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
	
	private createBranchDelivery(order: Order): any {
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
