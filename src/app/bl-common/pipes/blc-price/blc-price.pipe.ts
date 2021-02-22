import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "blcPrice",
})
export class BlcPricePipe implements PipeTransform {
	transform(price: string, identifier?: "international"): string {
		if (identifier === "international") {
			return parseFloat(price) + " NOK";
		} else {
			return parseFloat(price) + " kr";
		}
	}
}
