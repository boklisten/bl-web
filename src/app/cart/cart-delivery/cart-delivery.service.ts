import {Injectable} from '@angular/core';
import {BranchStoreService} from "../../branch/branch-store.service";
import {DeliveryService} from '@wizardcoder/bl-connect';
import {Delivery, BlApiError, Order} from '@wizardcoder/bl-model';
import {Subject} from "rxjs/Subject";
import {CartService} from "../cart.service";
import {CartOrderService} from "../order/cart-order.service";

@Injectable()
export class CartDeliveryService {
	private _deliveryChange$: Subject<Delivery>;
	private _currentDelivery: Delivery;
	private _initialConfigDone: boolean;
	private _fromPostalService: string;
	
	constructor(private _deliveryService: DeliveryService, private _cartService: CartService, private _cartOrderService: CartOrderService) {
		this._deliveryChange$ = new Subject();
		this._initialConfigDone = false;
		this._fromPostalService = '1316';
		
		const orderChange$ = this._cartOrderService.onOrderChange().subscribe((order: Order) => {
			if (!this._currentDelivery || this._currentDelivery.method === 'branch') {
				this.updateDeliveryBranch().then((addedDelivery: Delivery) => {
					this._currentDelivery = addedDelivery;
					this._initialConfigDone = true;
					this._deliveryChange$.next(this._currentDelivery);
					this.onCartChange();
				}).catch((blApiError: BlApiError) => {
					console.log('cartDeliveryService: could not add initial delivery from api');
				});
			} else {
				this.onCartChange();
			}
		});
		
		this.onDeliveryChange().subscribe(() => {
			this._cartOrderService.reloadOrder();
			orderChange$.unsubscribe();
		});
	}
	
	private onCartChange() {
		this._cartService.onCartChange().subscribe(() => {
			this.updateDelivery().then(() => {
			
			}).catch((blApiErr: BlApiError) => {
				console.log('cartDeliveryService: could not update delivery', blApiErr);
			});
		});
	}
	
	private updateDelivery(): Promise<Delivery> {
		if (!this._currentDelivery) {
			return Promise.reject(new Error('CartDeliveryService: current delivery is not defined'));
		}
		switch (this._currentDelivery.method) {
			case "bring":
				return this.updateDeliveryBring(this._currentDelivery.info['to']);
			case "branch":
				return this.updateDeliveryBranch();
		}
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
				from: this._fromPostalService,
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
				branch: order.branch
			},
			order: order.id,
			amount: 0
		};
	}
}
