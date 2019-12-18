import {
	Directive,
	Output,
	EventEmitter,
	ElementRef,
	HostListener
} from "@angular/core";

@Directive({
	selector: "[blcClickOutside]"
})
export class BlcClickOutsideDirective {
	constructor(private _elementRef: ElementRef) {}

	@Output()
	public blcClickOutside = new EventEmitter();

	@HostListener("document:click", ["$event.target"])
	public onClick(targetElement) {
		const blcClickedInside = this._elementRef.nativeElement.contains(
			targetElement
		);
		if (!blcClickedInside) {
			console.log("clicked outside");
			this.blcClickOutside.emit(null);
		} else {
			console.log("clicked inside");
		}
	}
}
