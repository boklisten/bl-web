import {Injectable} from '@angular/core';
import {Branch, CustomerItem, Item, OrderItem} from "@wizardcoder/bl-model";
import {BranchStoreService} from "../branch/branch-store.service";
import {OrderItemType} from "@wizardcoder/bl-model/dist/order/order-item/order-item-type";

@Injectable()
export class PriceService {

	constructor(private _branchStoreService: BranchStoreService) {
	}

	public calculateOrderItemUnitPrice(orderItem: OrderItem, item: Item, branch: Branch): number {
		if (orderItem.type === "rent") {
			return this.calculateItemUnitPrice(item, branch, orderItem.info.periodType);
		} else if (orderItem.type === "buy") {
			return this.calculateItemUnitPrice(item, branch, 'buy');
		}
	}

	public calculateItemUnitPrice(item: Item, branch: Branch, type: "semester" | "year" | "buy"): number {
		if (type === "semester" || type === "year") {
			return this.sanitize(this.calculatePriceBasedOnPeriodType(item, branch, type));
		} else if (type === "buy") {
			return this.sanitize(this.calculateBuyPrice(item, branch));
		}
	}

	public calculateCustomerItemUnitPrice(customerItem: CustomerItem, item: Item, branch: Branch, type: OrderItemType) {
		if (type === "extend") {
			return this.sanitize(this.calculateExtendPrice(item, branch, "semester"));
		} else if (type === "buyout") {
			return this.sanitize(this.calculateBuyoutPrice(customerItem, item, branch));
		}
	}

	public calculateOrderItemPrices(unitPrice: number, taxRate: number): {amount: number, unitPrice: number, taxRate: number, taxAmount: number} {
		const taxAmount = this.calculateOrderItemTaxAmount(unitPrice, taxRate);

		return {
			amount: this.calculateOrderItemAmount(unitPrice, taxAmount),
			unitPrice: this.sanitize(unitPrice),
			taxRate: taxRate,
			taxAmount: taxAmount
		};
	}

	public calculateOrderItemTaxAmount(unitPrice: number, taxRate: number) {
		if (unitPrice <= 0) { // no point in calculating tax amount on a price below 0
			return 0;
		}
		return this.sanitize(unitPrice * taxRate);
	}

	public calculateOrderItemAmount(unitPrice: number, taxAmount: number) {
		return this.sanitize(unitPrice + taxAmount);
	}

	private sanitize(sanitizeNumber: number): number {
		return +sanitizeNumber.toFixed(2);
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

	private roundDown(roundDownNum: number): number {
		if (roundDownNum <= 0) { // we should not round down if the number is under 0
			return roundDownNum;
		}
		return parseInt((roundDownNum / 10).toString(), 10) * 10;
	}

}
