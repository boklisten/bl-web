import {Injectable} from '@angular/core';
import {Branch, BranchItem, CustomerItem} from "@wizardcoder/bl-model";
import {BranchService} from "@wizardcoder/bl-connect";
import {Period} from "@wizardcoder/bl-model/dist/period/period";
import {DateService} from "../../date/date.service";
import {BranchStoreService} from "../../branch/branch-store.service";

@Injectable()
export class UserCustomerItemService {

	constructor(private _branchService: BranchService, private _dateService: DateService, private _branchStoreService: BranchStoreService) {
	}

	public isOnValidBranch(customerItem: CustomerItem, branchItem?: BranchItem) {
		const branch = this._branchStoreService.getBranch();

		if (customerItem.handoutInfo && customerItem.handoutInfo.handoutBy === 'branch' && customerItem.handoutInfo.handoutById === branch.id) {
			return true;
		}

		if (branchItem) {
			return (branchItem.branch === branch.id);
		}

		return false;
	}

	public isNotReturnedBeforeDeadline(customerItem: CustomerItem): boolean {
		if (customerItem.handout && !customerItem.returned) {
			return this._dateService.isDeadlineExpired(customerItem.deadline.toString());
		}
		return false;
	}

	public isExtendValid(branchItem: BranchItem, customerItem: CustomerItem): Promise<boolean> {
		if (!branchItem.rent || this._dateService.isDeadlineExpired(customerItem.deadline.toString()) || customerItem.returned) {
			return Promise.reject('userCustomerItemService: customerItem can not be extended');
		}

		return this._branchService.getById(branchItem.branch).then((branch: Branch) => {
			return this.isExtendPeriodValid('semester', branch);
		}).catch((getBranchError) => {
			return Promise.reject('userCustomerItemService: could not get branch');
		});
	}

	isBuyoutValid(branchItem: BranchItem, customerItem: CustomerItem): boolean {
		if (!branchItem.buy) {
			return false;
		}

		if (this._dateService.isDeadlineExpired(customerItem.deadline.toString()) || customerItem.returned) {
			return false;
		}

		return true;
	}

	private isExtendPeriodValid(period: Period, branch: Branch): boolean {
		if (branch.paymentInfo && branch.paymentInfo.extendPeriods && branch.paymentInfo.extendPeriods.length > 0) {
			for (const extendPeriod of branch.paymentInfo.extendPeriods) {
				if (period === extendPeriod.type) {
					return true;
				}
			}
		}
		return false;
	}

}
