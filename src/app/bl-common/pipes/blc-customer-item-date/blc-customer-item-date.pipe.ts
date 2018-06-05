import {Pipe, PipeTransform} from '@angular/core';
import {Branch, CustomerItem} from "@wizardcoder/bl-model";
import {DateService} from "../../../date/date.service";
import {BranchStoreService} from "../../../branch/branch-store.service";

@Pipe({
	name: 'blcCustomerItemDate'
})
export class BlcCustomerItemDatePipe implements PipeTransform {

	constructor(private _dateService: DateService, private _branchStoreService: BranchStoreService) {

	}

	transform(customerItem: CustomerItem, type: 'extend', periodType: 'semester' | 'year'): Promise<Date> {
		return this._branchStoreService.getActiveBranch().then((branch: Branch) => {
			return this._dateService.getExtendDate(branch, periodType);
		}).catch((getBranchError) => {
			throw new Error('BlcCusomterItemDatePipe: could not get branch: ' + getBranchError);
		});
	}

}
