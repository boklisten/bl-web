import { Component, Input, OnInit } from "@angular/core";
import {
	BlApiError,
	CustomerItem,
	UserDetail,
	Branch,
} from "@boklisten/bl-model";
import { CustomerItemService, BranchService } from "@boklisten/bl-connect";
import { UserService } from "../user.service";
import { UserCustomerItemService } from "../user-customer-item/user-customer-item.service";
import { CartService } from "../../cart/cart.service";
import { BranchStoreService } from "../../branch/branch-store.service";

@Component({
	selector: "app-user-item",
	templateUrl: "./user-item.component.html",
	styleUrls: ["./user-item.component.scss"],
})
export class UserItemComponent implements OnInit {
	public customerItems: CustomerItem[];
	public activeCustomerItems: CustomerItem[];
	public inactiveCustomerItems: CustomerItem[];
	public showInactiveCustomerItems: boolean;
	public allBranches: Branch[];
	public selectedBranch: Branch;
	public wait = false;

	constructor(
		private _customerItemService: CustomerItemService,
		private _userService: UserService,
		private _userCustomerItemService: UserCustomerItemService,
		private _cartService: CartService,
		private _branchService: BranchService,
		private _branchStoreService: BranchStoreService
	) {
		this.activeCustomerItems = [];
		this.inactiveCustomerItems = [];
	}

	async ngOnInit() {
		this._userService
			.getUserDetail()
			.then((userDetail: UserDetail) => {
				this._customerItemService
					.getManyByIds(userDetail.customerItems as string[], {
						fresh: true,
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
		this.selectedBranch = this._branchStoreService.getBranch();
		this.allBranches = (
			await this._branchService.get()
		).sort((a: Branch, b: Branch) => a.name.localeCompare(b.name));
	}

	public onBranchSelect(branchId: string) {
		this.wait = true;
		this._branchStoreService.setBranch(
			this.allBranches.find((branch) => branch.id === branchId) ??
				({} as Branch)
		);

		// Trigger re-render of children
		const copy = this.activeCustomerItems;
		this.activeCustomerItems = [];
		setTimeout(() => {
			this.activeCustomerItems = copy;
			this.wait = false;
		});
	}

	public cartActive() {
		return !this._cartService.isEmpty();
	}
}
