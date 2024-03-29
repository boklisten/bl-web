import { Injectable } from "@angular/core";
import {
	Branch,
	BranchItem,
	CustomerItem,
	UserDetail,
} from "@boklisten/bl-model";
import { CustomerItemService } from "@boklisten/bl-connect";
import { Period } from "@boklisten/bl-model";
import { DateService } from "../../date/date.service";
import { BranchStoreService } from "../../branch/branch-store.service";
import { UserService } from "../user.service";
import * as moment from "moment";

@Injectable()
export class UserCustomerItemService {
	private customerItems: CustomerItem[];
	private _maxDeadline: string;

	constructor(
		private _dateService: DateService,
		private _userService: UserService,
		private _customerItemService: CustomerItemService,
		private _branchStoreService: BranchStoreService
	) {
		this._maxDeadline = this.calculateMaxDeadline();
	}

	private calculateMaxDeadline(): string {
		const now = moment();
		const day = now.format("DD");
		const month = now.format("MM");
		const year = now.format("YYYY");

		if (month === "12" && Number(day) > 19) {
			return `${year}-12-31`;
		}

		const lastYear = now.subtract(1, "year").format("YYYY");
		return `${lastYear}-12-31`;
	}

	public isActive(customerItem: CustomerItem): boolean {
		return (
			(this.isExtendValid(customerItem) ||
				this.isBuyoutValid(customerItem) ||
				!customerItem.returned) &&
			!this.isNotReturnedBeforeDeadline(customerItem) &&
			!customerItem.buyout
		);
	}

	public isOnValidBranch(
		customerItem: CustomerItem,
		branchItem?: BranchItem
	) {
		const branch = this._branchStoreService.getBranch();

		if (
			customerItem.handoutInfo &&
			customerItem.handoutInfo.handoutBy === "branch" &&
			customerItem.handoutInfo.handoutById === branch.id
		) {
			return true;
		}

		if (branchItem) {
			return branchItem.branch === branch.id;
		}

		return false;
	}

	public alreadyHaveItem(itemId: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._userService
				.getUserDetail()
				.then((userDetail: UserDetail) => {
					this.fetchCustomerItems(userDetail)
						.then(() => {
							resolve(this.checkIfItemIsInCustomerItems(itemId));
						})
						.catch(() => {
							console.log(
								"UserCustomerItemService: could not fetch customer items"
							);
						});
				})
				.catch(() => {
					console.log(
						"UserCustomerItemService: could not get user detail"
					);
				});
		});
	}

	public getCustomerItemByItemId(itemId: string): CustomerItem | undefined {
		return this.customerItems
			?.filter(() => this.checkIfItemIsInCustomerItems(itemId))
			.find((customerItem) => customerItem.item === itemId);
	}

	public isExtendableCustomerItem(itemId: string): boolean {
		return this.customerItems
			?.filter(() => this.checkIfItemIsInCustomerItems(itemId))
			.some((customerItem) => this.isExtendValid(customerItem));
	}

	private checkIfItemIsInCustomerItems(itemId: string): boolean {
		if (!this.customerItems || this.customerItems.length <= 0) {
			return false;
		}

		for (const customerItem of this.customerItems) {
			if (
				!customerItem.returned &&
				!customerItem.buyout &&
				customerItem.handout
			) {
				if (customerItem.item === itemId) {
					return true;
				}
			}
		}

		return false;
	}

	private fetchCustomerItems(userDetail: UserDetail): Promise<boolean> {
		return this._customerItemService
			.getManyByIds(userDetail.customerItems as string[], { fresh: true })
			.then((customerItems: CustomerItem[]) => {
				this.customerItems = customerItems;
				return true;
			})
			.catch((getCustomerItemsError) => {
				throw new Error(
					"UserOrderService: could not get customer items: " +
						getCustomerItemsError
				);
			});
	}

	public isNotReturnedBeforeDeadline(customerItem: CustomerItem): boolean {
		if (customerItem.handout && !customerItem.returned) {
			return this._dateService.isDeadlineExpired(
				customerItem.deadline.toString(),
				this._maxDeadline
			);
		}
		return false;
	}

	public isExtendValid(customerItem: CustomerItem): boolean {
		if (
			this._dateService.isDeadlineExpired(
				customerItem.deadline.toString(),
				this._maxDeadline
			) ||
			customerItem.returned
		) {
			return false;
		}

		const branch = this._branchStoreService.getBranch();
		return (
			this.isExtendPeriodValid(
				customerItem.deadline,
				"semester",
				branch
			) &&
			this.isExtendPeriodValidOnCustomerItem("semester", customerItem)
		);
	}

	public isBuyoutValid(customerItem: CustomerItem): boolean {
		/* buyout should be its own flag in the future
		if (!branchItem.buy) {
			return false;
		}
		*/

		if (
			!this._dateService.isDeadlineExpired(
				customerItem.deadline.toString(),
				this._maxDeadline
			) &&
			!this._dateService.isCancelValid(customerItem.creationTime) &&
			!customerItem.returned &&
			!customerItem.match
		) {
			return true;
		}

		return false;
	}

	private isExtendPeriodValidOnCustomerItem(
		period: Period,
		customerItem: CustomerItem
	): boolean {
		return (
			!customerItem.periodExtends ||
			customerItem.periodExtends.length === 0
		);
	}

	private isExtendPeriodValid(
		originalDeadline: Date,
		period: Period,
		branch: Branch
	): boolean {
		if (
			branch.paymentInfo &&
			branch.paymentInfo.extendPeriods &&
			branch.paymentInfo.extendPeriods.length > 0
		) {
			for (const extendPeriod of branch.paymentInfo.extendPeriods) {
				if (
					period === extendPeriod.type &&
					originalDeadline !== extendPeriod.date
				) {
					return true;
				}
			}
		}
		return false;
	}
}
