import {Injectable} from '@angular/core';
import {CustomerItem} from "bl-model";

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
	
	public getCurrentYear(): string {
		return "2018";
	}
	
	public isDeadlineExpired(deadline: string): boolean {
		return (new Date(deadline).getTime() < new Date().getTime());
	}
	
}
