import {BlcCustomerItemDatePipe} from './blc-customer-item-date.pipe';
import {DateService} from "../../../date/date.service";

describe('BlcCustomerItemDatePipe', () => {
	it('create an instance', () => {
		const pipe = new BlcCustomerItemDatePipe({} as DateService);
		expect(pipe).toBeTruthy();
	});
});
