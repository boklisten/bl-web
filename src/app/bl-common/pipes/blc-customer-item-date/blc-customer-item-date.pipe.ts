import {Pipe, PipeTransform} from '@angular/core';
import {Branch, CustomerItem} from "@boklisten/bl-model";
import {DateService} from "../../../date/date.service";
import {BranchStoreService} from "../../../branch/branch-store.service";

@Pipe({
	name: 'blcCustomerItemDate'
})
export class BlcCustomerItemDatePipe implements PipeTransform {

	constructor(private _dateService: DateService) {

	}

	transform(customerItem: CustomerItem, type: 'extend', periodType: 'semester' | 'year'): Date {
		return this._dateService.getExtendDate(periodType);
	}

}
