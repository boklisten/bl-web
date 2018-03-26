import {Injectable} from '@angular/core';
import {Order, BlApiError} from 'bl-model';
import {Subject} from "rxjs/Subject";
import {CartService} from "../cart.service";
import {OrderService} from 'bl-connect';

@Injectable()
export class CartOrderService {
	
	private _currentOrder: Order;
	private _orderChange$: Subject<Order>;
	
	constructor(private _cartService: CartService, private _orderService: OrderService) {
		this._orderChange$ = new Subject();
		
		if (this._cartService.getSize() > 0) {
			console.log('cartOrderService: creating order');
			this.updateOrder(this._cartService.createOrder());
		}
		
		this._cartService.onCartChange().subscribe(() => {
			console.log('cartOrderService: the cart changed', this._cartService.getSize());
			if (this._cartService.getSize() > 0) {
				this.updateOrder(this._cartService.createOrder());
			}
		});
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
	
	private updateOrder(order: Order) {
		if (order === this._currentOrder) {
			return;
		}
		
		if (this._currentOrder) {
			console.log('cartOrderService: trying to update');
			this._orderService.update(this._currentOrder.id, order).then((updatedOrder: Order) => {
				this._currentOrder = updatedOrder;
				this._orderChange$.next(this._currentOrder);
			}).catch((blApiErr: BlApiError) => {
				console.log('cartOrderService: could not update order', blApiErr);
			});
		} else {
			console.log('cartOrderService: trying to add');
			this._orderService.add(order).then((addedOrder: Order) => {
				this._currentOrder = addedOrder;
				this._orderChange$.next(this._currentOrder);
			}).catch((blApiErr: BlApiError) => {
				console.log('cartOrderService: could not add order', blApiErr);
			});
		}
	}
}
