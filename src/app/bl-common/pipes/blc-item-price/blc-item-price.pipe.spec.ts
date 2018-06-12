import {BlcItemPricePipe} from './blc-item-price.pipe';
import {BranchStoreService} from "../../../branch/branch-store.service";
import {PriceService} from "../../../price/price.service";

describe('BlcItemPricePipe', () => {
	it('create an instance', () => {
		const pipe = new BlcItemPricePipe({} as BranchStoreService, {} as PriceService);
		expect(pipe).toBeTruthy();
	});
});
