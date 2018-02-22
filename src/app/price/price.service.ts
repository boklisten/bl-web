import {Injectable} from '@angular/core';
import {Item, OrderItem} from "bl-model";
import {BranchService} from "bl-connect";
import {BranchStoreService} from "../branch/branch-store.service";

@Injectable()
export class PriceService {
	
	constructor(private _branchStoreService: BranchStoreService) {
	}
	
	public calculatePrice(orderItem: OrderItem, semester: "one" | "two"): number {
		if (semester === "one") {
			return this.roundDown(orderItem.unitPrice * this._branchStoreService.getCurrentBranch().payment.rentPricePercentage.oneSemester);
		} else {
			return this.roundDown(orderItem.unitPrice * this._branchStoreService.getCurrentBranch().payment.rentPricePercentage.twoSemesters);
		}
	}
	
	private roundDown(num: number): number {
		return parseInt((num / 10).toString(), 10) * 10;
	}
	
}
