import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user/user.service";
import { BookingService } from "@wizardcoder/bl-connect";
import { Booking } from "@wizardcoder/bl-model";

@Component({
	selector: "app-booking-your-bookings",
	templateUrl: "./booking-your-bookings.component.html",
	styleUrls: ["./booking-your-bookings.component.scss"]
})
export class BookingYourBookingsComponent implements OnInit {
	public bookings: Booking[];
	constructor(
		private userService: UserService,
		private bookingService: BookingService
	) {
		this.bookings = [];
	}

	ngOnInit() {
		const userDetailId = this.userService.getUserDetailId();
		this.bookingService
			.get({ query: "?customer=" + userDetailId })
			.then(bookings => {
				this.bookings = bookings;
			})
			.catch(e => {
				console.log("could not get bookings", e);
			});
	}
}
