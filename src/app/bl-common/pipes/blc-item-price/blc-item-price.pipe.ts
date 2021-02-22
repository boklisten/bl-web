import { Pipe, PipeTransform } from "@angular/core";
import { PriceService } from "../../../price/price.service";
import { BranchStoreService } from "../../../branch/branch-store.service";
import { Item, OrderItemType } from "@boklisten/bl-model";

@Pipe({
	name: "blcItemPrice",
})
export class BlcItemPricePipe implements PipeTransform {
	constructor(
		private _branchStoreService: BranchStoreService,
		private _priceService: PriceService
	) {}

	transform(item: Item, type: OrderItemType): any {
		const branch = this._branchStoreService.getBranch();
		return this._priceService.calculateItemUnitPrice(item, branch, type);
	}
}
