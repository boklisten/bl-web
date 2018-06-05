import {Injectable} from '@angular/core';
import {Branch, CustomerItem, Item} from "@wizardcoder/bl-model";
import * as moment from 'moment';

@Injectable()
export class DateService {

	constructor() {
	}

	public dateString(date): string {
		return moment(date).format('DD.MM.YYYY');
	}

	public timestampString(date: Date): string {
		return moment(date).format('DD.MM.YYYY-HH.mm.ss');
	}

	public hourString(date: Date): string {
		return 'kl ' + moment(date).format('HH.mm');
	}

	public untilString(date: Date): string {
		return this.daysUntil(date);
	}


	public getExtendDate(branch: Branch, periodType: 'semester' | 'year'): Date {
		if (branch.paymentInfo.extendPeriods) {
			for (const extendPeriod of branch.paymentInfo.extendPeriods) {
				if (extendPeriod.type === periodType) {
					return moment().add(1, 'year').toDate();
				}
			}
		}
	}

	public getDate(orderItemType: "one" | "two" | "buy" | "buyout" | "extend", customerItem?: CustomerItem) {
		if (orderItemType === "one") {
			return "20.12.2018";
		} else if (orderItemType === "two") {
			return "01.07.2019";
		} else if (orderItemType === "extend") {
			return "01.07.2019";
		} else {
			return "";
		}
	}

	public daysUntil(date: Date): string {
		return moment(date).endOf('day').fromNow();
	}

	public getCurrentYear(): string {
		return "2018";
	}

	public isDeadlineExpired(deadline: string): boolean {
		return (new Date(deadline).getTime() < new Date().getTime());
	}

}
