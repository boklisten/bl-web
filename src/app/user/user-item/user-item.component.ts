import { Component, Input, OnInit } from "@angular/core";
import { BlApiError, CustomerItem, UserDetail } from "@boklisten/bl-model";
import { CustomerItemService } from "@boklisten/bl-connect";
import { UserService } from "../user.service";
import { UserCustomerItemService } from "../user-customer-item/user-customer-item.service";
import { CartService } from "../../cart/cart.service";

@Component({
	selector: "app-user-item",
	templateUrl: "./user-item.component.html",
	styleUrls: ["./user-item.component.scss"]
})
export class UserItemComponent implements OnInit {
	public customerItems: CustomerItem[];
	public activeCustomerItems: CustomerItem[];
	public inactiveCustomerItems: CustomerItem[];
	public showInactiveCustomerItems: boolean;

	constructor(
		private _customerItemService: CustomerItemService,
		private _userService: UserService,
		private _userCustomerItemService: UserCustomerItemService,
		private _cartService: CartService
	) {
		this.activeCustomerItems = [];
		this.inactiveCustomerItems = [];
	}

	ngOnInit() {
		this._userService
			.getUserDetail()
			.then((userDetail: UserDetail) => {
				this._customerItemService
					.getManyByIds(userDetail.customerItems as string[], {
						fresh: true
					})
					.then((customerItems: CustomerItem[]) => {
						for (let customerItem of customerItems) {
							if (
								this._userCustomerItemService.isActive(
									customerItem
								)
							) {
								this.activeCustomerItems.push(customerItem);
							} else {
								this.inactiveCustomerItems.push(customerItem);
							}
						}
					})
					.catch((customerItemsError: BlApiError) => {
						console.log(
							"userItemComponent: could not get customerItems",
							customerItemsError
						);
					});
			})
			.catch((blApiErr: BlApiError) => {
				console.log(
					"UserItemComponent: could not get items: ",
					blApiErr
				);
			});
	}

	public cartActive() {
		return !this._cartService.isEmpty();
	}
}
