import {Injectable} from '@angular/core';
import {Order, BlApiError} from '@wizardcoder/bl-model';
import {Subject} from "rxjs/Subject";
import {CartService} from "../cart.service";
import {OrderService} from '@wizardcoder/bl-connect';
import {UserService} from "../../user/user.service";

@Injectable()
export class CartOrderService {
	
	private _currentOrder: Order;
	private _orderChange$: Subject<Order>;
	
	constructor(private _cartService: CartService, private _orderService: OrderService, private _userService: UserService) {
		this._orderChange$ = new Subject();
		
		if (this._cartService.getSize() > 0) {
			this.updateOrder(this._cartService.createOrder()).then((updatedOrder: Order) => {
				this.onCartChange();
			}).catch((updateOrderError) => {
				console.log('cartOrderService: on init: could not update order', updateOrderError);
			});
		} else {
			this.onCartChange();
		}
	}
	
	private onCartChange() {
		this._cartService.onCartChange().subscribe(() => {
			if (this._cartService.getSize() > 0) {
				this.updateOrder(this._cartService.createOrder()).then(() => {
					// the order is updated
				}).catch((updateOrderError) => {
					console.log('cartOrderService: could not update order', updateOrderError);
				});
			}
		});
	}
	
	public createOrder(): Promise<Order> {
		if (this._cartService.getSize() <= 0) {
			return Promise.reject(new Error('cartOrderService: can not create a order from a empty cart'));
		}
		
		return new Promise((resolve, reject) => {
			if (this._currentOrder) {
				resolve(this._currentOrder);
			} else {
				const order = this._cartService.createOrder();
				
				this._orderService.add(order).then((addedOrder: Order) => {
					this._currentOrder = addedOrder;
					this._orderChange$.next(this._currentOrder);
				}).catch((blApiErr: BlApiError) => {
					console.log('cartOrderService: could not add order', blApiErr);
				});
			}
		});
	}
	
	public clearOrder() {
		this._currentOrder = null;
	}
	
	
	public setOrder(order: Order) {
		this._currentOrder = order;
		this.updateOrder(order);
	}
	
	public onOrderChange(): Subject<Order> {
		return this._orderChange$;
	}
	
	public getOrder(): Order {
		return this._currentOrder;
	}
	
	public reloadOrder() {
		this._orderService.getById(this._currentOrder.id).then((reloadedOrder: Order) => {
			if (this._currentOrder !== reloadedOrder) {
				this._currentOrder = reloadedOrder;
				this._orderChange$.next(this._currentOrder);
			}
		}).catch((blApiErr: BlApiError) => {
			console.log('cartOrderService: error when trying to get order', blApiErr);
		});
	}
	
	private updateOrder(order: Order): Promise<Order> {
		return new Promise((resolve, reject) => {
			if (order === this._currentOrder) {
				resolve(this._currentOrder);
			}
			
			// no point in adding a order if the user is not logged in
			if (!this._userService.loggedIn()) {
				reject(new Error('cartOrderService: updatedOrder: user not logged in'));
			}
			
			if (this._currentOrder) {
				this._orderService.update(this._currentOrder.id, order).then((updatedOrder: Order) => {
					this._currentOrder = updatedOrder;
					this._orderChange$.next(this._currentOrder);
					resolve(this._currentOrder);
				}).catch((blApiErr: BlApiError) => {
					reject(new Error('cartOrderService: could not update order: ' + blApiErr));
				});
			} else {
				this._orderService.add(order).then((addedOrder: Order) => {
					this._currentOrder = addedOrder;
					this._orderChange$.next(this._currentOrder);
					resolve(this._currentOrder);
				}).catch((blApiErr: BlApiError) => {
					reject(new Error('cartOrderService: could not add order: ' + blApiErr));
				});
			}
		});
	}
}
