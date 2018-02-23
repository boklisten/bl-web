import {Injectable} from '@angular/core';

@Injectable()
export class DateService {
	
	constructor() {
	}
	
	public getDate(semester: "one" | "two") {
		if (semester === "one") {
			return "20.12.2018";
		}
		return "01.07.2019";
	}
	
	public getCurrentYear(): string {
		return "2018";
	}
	
}
