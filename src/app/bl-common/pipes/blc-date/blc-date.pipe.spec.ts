import {BlcDatePipe} from './blc-date.pipe';
import {DateService} from "../../../date/date.service";

describe('BlcDatePipe', () => {
	it('create an instance', () => {
		const pipe = new BlcDatePipe({} as DateService);
		expect(pipe).toBeTruthy();
	});
});
