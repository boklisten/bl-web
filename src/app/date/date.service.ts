import {Injectable} from '@angular/core';
import {CustomerItem} from "bl-model";
import * as moment from 'moment';

@Injectable()
export class DateService {
	
	constructor() {
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
