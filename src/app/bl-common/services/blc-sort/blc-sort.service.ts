import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class BlcSortService {
	constructor() {}

	public sortByField(list: any[], field: string): any[] {
		return list.sort((a: any, b: any) => {
			if (
				a &&
				a[field] &&
				typeof a[field] === "string" &&
				b &&
				b[field] &&
				typeof b[field] === "string"
			) {
				const fieldA = a[field].toLowerCase();
				const fieldB = b[field].toLowerCase();
				if (fieldA < fieldB) {
					return -1;
				} else if (fieldA > fieldB) {
					return 1;
				}
			}
			return 0;
		});
	}
}
