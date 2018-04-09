import {Injectable} from '@angular/core';
import {Branch, CustomerItem, Item, OrderItem} from "@wizardcoder/bl-model";
import {BranchService} from "@wizardcoder/bl-connect";
import {BranchStoreService} from "../branch/branch-store.service";

@Injectable()
export class PriceService {
	
	constructor(private _branchStoreService: BranchStoreService) {
	}
	
	public getOrderItemPrice(orderItem: OrderItem, item: Item, branch: Branch): number {
		if (orderItem.type === "rent") {
			return this.calculatePriceBasedOnPeriodType(item, branch, orderItem.info.periodType);
		} else if (orderItem.type === "buy") {
			return this.calculateBuyPrice(item, branch);
		} else if (orderItem.type === "extend") {
			return this.calculateExtendPrice(item, branch, orderItem.info.periodType);
		}
	}
	
	public getItemPrice(item: Item, branch: Branch, type: "semester" | "year" | "buy"): number {
		if (type === "semester" || type === "year") {
			return this.calculatePriceBasedOnPeriodType(item, branch, type);
		} else if (type === "buy") {
			return this.calculateBuyPrice(item, branch);
		}
	}
	
	public getCustomerItemPrice(customerItem: CustomerItem, item: Item, branch: Branch, type: "extend" | "buyout") {
		if (type === "extend") {
			return this.calculateExtendPrice(item, branch, "semester");
		} else if (type === "buyout") {
			return this.calculateBuyoutPrice(customerItem, item, branch);
		}
	}
	
	
	private calculateBuyoutPrice(customerItem: CustomerItem, item: Item, branch: Branch): number {
		return this.roundDown(item.price * branch.paymentInfo.buyout.percentage);
	}
	
	private calculateBuyPrice(item: Item, branch: Branch): number {
		return this.roundDown(item.price);
	}
	
	private calculateExtendPrice(item: Item, branch: Branch, periodType: "semester" | "year"): number {
		if (branch.paymentInfo.responsible) {
			return 0;
		}
		
		for (const extendPeriod of branch.paymentInfo.extendPeriods) {
			if (extendPeriod.type === periodType) {
				if (extendPeriod.percentage) {
					return this.roundDown((item.price * extendPeriod.percentage));
				}
				return extendPeriod.price;
			}
		}
		
		throw new Error(`could not find extend price for item "${item.id}" for period "${periodType}"`);
	}
	
	private calculatePriceBasedOnPeriodType(item: Item, branch: Branch, period: "semester" | "year"): number {
		if (branch.paymentInfo.responsible) {
			return 0;
		}
		
		for (const rentPeriod of branch.paymentInfo.rentPeriods) {
			if (rentPeriod.type === period) {
				return this.roundDown((item.price * rentPeriod.percentage));
			}
		}
		
		throw new Error(`could not find price for item "${item.id}" for period "${period}"`);
	}
	
	public showPrice(): boolean {
		if (!this._branchStoreService.getBranch()) {
			return false;
		}
		
		return !this._branchStoreService.getBranch().paymentInfo.responsible;
	}
	
	private roundDown(num: number): number {
		return parseInt((num / 10).toString(), 10) * 10;
	}
	
}
