import { Component, OnInit } from "@angular/core";
import { BlApiError, Order, UserDetail } from "@boklisten/bl-model";
import { UserService } from "../user.service";
import { OrderService, UserDetailService } from "@boklisten/bl-connect";
import { Router } from "@angular/router";

@Component({
	selector: "app-order",
	templateUrl: "./order.component.html",
	styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit {
	public orders: Order[];
	public loading: boolean;

	constructor(
		private _userService: UserService,
		private _orderService: OrderService,
		private _userDetailService: UserDetailService
	) {
		this.orders = [];
	}

	ngOnInit() {
		this.loading = true;
		this.getOrders()
			.then((orders: Order[]) => {
				this.orders = orders;
				this.loading = false;
			})
			.catch((apiErr: BlApiError) => {
				// console.log('could not get orders', apiErr);
				this.loading = false;
			});
	}

	getOrders(): Promise<Order[]> {
		return new Promise((resolve, reject) => {
			this._userDetailService
				.getById(this._userService.getUserDetailId(), { fresh: true })
				.then((userDetail: UserDetail) => {
					this._orderService
						.getManyByIds(userDetail.orders as string[], {
							fresh: true,
						})
						.then((orders: Order[]) => {
							resolve(orders);
						})
						.catch((orderServiceError: BlApiError) => {
							console.log(
								"could not get orders",
								orderServiceError
							);
						});
				})
				.catch((userDetailError: BlApiError) => {
					console.log("could not get userDetails", userDetailError);
				});
		});
	}

	showOrders(): boolean {
		return this.orders.length > 0;
	}
}
