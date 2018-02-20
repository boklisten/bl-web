import {Injectable} from '@angular/core';
import {Item} from "bl-model";
import {BranchService} from "bl-connect";
import {BranchStoreService} from "../branch/branch-store.service";

@Injectable()
export class PriceService {
	
	constructor(private _branchStoreService: BranchStoreService) {
	}
	
	public calculatePrice(item: Item, semester: "one" | "two"): number {
		if (semester === "one") {
			return this.roundDown(item.price * this._branchStoreService.getCurrentBranch().payment.rentPricePercentage.oneSemester);
		} else {
			return this.roundDown(item.price * this._branchStoreService.getCurrentBranch().payment.rentPricePercentage.twoSemesters);
		}
	}
	
	private roundDown(num: number): number {
		return Math.round(num / 10) * 10;
	}
	
}
