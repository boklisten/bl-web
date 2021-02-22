import { Component, OnInit, Input } from "@angular/core";
import { Booking } from "@boklisten/bl-model";

@Component({
	selector: "app-booking-display",
	templateUrl: "./booking-display.component.html",
	styleUrls: ["./booking-display.component.scss"],
})
export class BookingDisplayComponent implements OnInit {
	@Input() booking: Booking;

	constructor() {}

	ngOnInit() {}
}
