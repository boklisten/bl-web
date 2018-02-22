import {Component, OnInit} from '@angular/core';
import {BlApiError, Order, UserDetail} from "bl-model";
import {UserService} from "../user.service";
import {OrderService, UserDetailService} from "bl-connect";

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
	public orders: Order[];
	
	constructor(private _userService: UserService, private _orderService: OrderService, private _userDetailService: UserDetailService) {
		this.orders = [];
	}
	
	ngOnInit() {
		this.getOrders().then((orders: Order[]) => {
			this.orders = orders;
		}).catch((apiErr: BlApiError) => {
			console.log('could not get orders', apiErr);
		});
	}
	
	getOrders(): Promise<Order[]> {
		return new Promise((resolve, reject) => {
			this._userDetailService.getById(this._userService.getUserDetailId()).then((userDetail: UserDetail) => {
				this._orderService.getManyByIds(userDetail.orders).then((orders: Order[]) => {
					resolve(orders);
				}).catch((orderServiceError: BlApiError) => {
					console.log('could not get orders', orderServiceError);
				});
			}).catch((userDetailError: BlApiError) => {
				console.log('could not get userDetails', userDetailError);
			});
		});
	}
	
	showOrders(): boolean {
		return (this.orders.length > 0);
	}
	
}
