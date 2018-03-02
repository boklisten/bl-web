import {Injectable} from '@angular/core';
import {Branch, CustomerItem, Item, OrderItem} from "bl-model";
import {BranchService} from "bl-connect";
import {BranchStoreService} from "../branch/branch-store.service";

@Injectable()
export class PriceService {
	
	constructor(private _branchStoreService: BranchStoreService) {
	}
	
	public oneSemester(item: Item): number {
		if (this._branchStoreService.getCurrentBranch().payment.branchResponsible) {
			return 0;
		}
		return this.roundDown(item.price * this._branchStoreService.getCurrentBranch().payment.rentPricePercentage.oneSemester);
	}
	
	public twoSemesters(item: Item): number {
		if (this._branchStoreService.getCurrentBranch().payment.branchResponsible) {
			return 0;
		}
		return this.roundDown(item.price * this._branchStoreService.getCurrentBranch().payment.rentPricePercentage.twoSemesters);
	}
	
	public showPrice(): boolean {
		return !this._branchStoreService.getCurrentBranch().payment.branchResponsible;
	}
	
	public buyoutPrice(customerItem: CustomerItem, item: Item): number {
		return this.roundDown(item.price - customerItem.totalAmount);
	}
	
	public extendPrice(customerItem: CustomerItem, branch: Branch): number {
		return branch.payment.extendPrice;
	}
	
	private roundDown(num: number): number {
		return parseInt((num / 10).toString(), 10) * 10;
	}
	
}
