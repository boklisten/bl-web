import { Component, OnInit } from "@angular/core";
import { BlApiError, Order, UserDetail } from "@boklisten/bl-model";
import { UserService } from "../user.service";
import { OrderService, UserDetailService } from "@boklisten/bl-connect";

@Component({
	selector: "app-order",
	templateUrl: "./order.component.html",
	styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit {
	public orders: Order[];
	public loading: boolean;
	public userDetail: UserDetail;

	constructor(
		private _userService: UserService,
		private _orderService: OrderService,
		private _userDetailService: UserDetailService
	) {
		this.orders = [];
	}

	ngOnInit() {
		this.loading = true;
		this._userDetailService
			.getById(this._userService.getUserDetailId())
			.catch((userDetailError: BlApiError) => {
				console.log("could not get userDetails", userDetailError);
			})
			.then(async (userDetail) => {
				if (!userDetail) {
					return;
				}
				this.userDetail = userDetail;
				try {
					this.orders = await this.getOrders();
					this.loading = false;
				} catch (apiErr) {
					this.loading = false;
				}
			});
	}

	getOrders(): Promise<Order[]> {
		return new Promise((resolve, reject) => {
			this._orderService
				.getManyByIds(this.userDetail.orders as string[], {
					fresh: true,
				})
				.then((orders: Order[]) => {
					resolve(orders);
				})
				.catch((orderServiceError: BlApiError) => {
					console.error("could not get orders", orderServiceError);
				});
		});
	}

	showOrders(): boolean {
		return this.orders.length > 0;
	}
}
