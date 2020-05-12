import { Directive, HostListener } from "@angular/core";
import { Location } from "@angular/common";

@Directive({
	selector: "[blcGoBack]"
})
export class BlcGoBackDirective {
	constructor(private location: Location) {}

	@HostListener("click")
	onClick() {
		this.location.back();
	}
}
