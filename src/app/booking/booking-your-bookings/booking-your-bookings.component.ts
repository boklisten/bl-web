import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user/user.service";
import { BookingService } from "@boklisten/bl-connect";
import { Booking } from "@boklisten/bl-model";

@Component({
	selector: "app-booking-your-bookings",
	templateUrl: "./booking-your-bookings.component.html",
	styleUrls: ["./booking-your-bookings.component.scss"]
})
export class BookingYourBookingsComponent implements OnInit {
	public wait: boolean;
	public bookings: Booking[];
	constructor(
		private userService: UserService,
		private bookingService: BookingService
	) {
		this.bookings = [];
	}

	ngOnInit() {
		const userDetailId = this.userService.getUserDetailId();
		this.wait = true;
		this.bookingService
			.get({ query: "?customer=" + userDetailId })
			.then(bookings => {
				this.bookings = bookings;
				this.wait = false;
			})
			.catch(e => {
				this.wait = false;
				console.log("could not get bookings", e);
			});
	}

	onCancel(booking: Booking) {
		console.log("should cancel", booking);
	}
}
