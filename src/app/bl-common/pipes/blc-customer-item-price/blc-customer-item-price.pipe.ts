import { Pipe, PipeTransform } from "@angular/core";
import {
	Branch,
	CustomerItem,
	Item,
	OrderItemType
} from "@boklisten/bl-model";
import { BranchStoreService } from "../../../branch/branch-store.service";
import { PriceService } from "../../../price/price.service";
import { ItemService } from "@boklisten/bl-connect";

@Pipe({
	name: "blcCustomerItemPrice"
})
export class BlcCustomerItemPricePipe implements PipeTransform {
	constructor(
		private _branchStoreService: BranchStoreService,
		private _priceService: PriceService,
		private _itemService: ItemService
	) {}

	transform(
		customerItem: CustomerItem,
		type: OrderItemType
	): Promise<number> {
		return this._branchStoreService
			.getActiveBranch()
			.then((branch: Branch) => {
				return this._itemService
					.getById(customerItem.item as string)
					.then((item: Item) => {
						return this._priceService.calculateCustomerItemUnitPrice(
							customerItem,
							item,
							branch,
							type
						);
					})
					.catch(getItemError => {
						throw new Error(
							"BlcCustomerItemPricePipe: could not get item: " +
								getItemError
						);
					});
			})
			.catch(getBranchError => {
				throw new Error(
					"BlcCustomerItemPricePipe: could not get branch: " +
						getBranchError
				);
			});
	}
}
