import {BlcCustomerItemPricePipe} from './blc-customer-item-price.pipe';
import {BranchStoreService} from "../../../branch/branch-store.service";
import {PriceService} from "../../../price/price.service";
import {ItemService} from "@boklisten/bl-connect";

describe('BlcCustomerItemPricePipe', () => {
	it('create an instance', () => {
		const pipe = new BlcCustomerItemPricePipe({} as BranchStoreService, {} as PriceService, {} as ItemService);
		expect(pipe).toBeTruthy();
	});
});
