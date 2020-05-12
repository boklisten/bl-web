import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BookingService } from "@wizardcoder/bl-connect";
import { Booking } from "@wizardcoder/bl-model";

@Component({
	selector: "app-booking-event-confirmed",
	templateUrl: "./booking-event-confirmed.component.html",
	styleUrls: ["./booking-event-confirmed.component.scss"]
})
export class BookingEventConfirmedComponent implements OnInit {
	public booking: Booking;
	public wait: boolean;
	public bookingConfirmed: boolean;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private bookingService: BookingService
	) {}

	ngOnInit() {
		this.wait = true;
		this.route.params.subscribe(params => {
			if (params.id) {
				this.bookingService
					.getById(params.id)
					.then(booking => {
						this.booking = booking;
						this.wait = false;
						this.checkIfBookingIsValid();
					})
					.catch(e => {
						this.wait = false;
					});
			}
		});
	}

	checkIfBookingIsValid() {
		if (!this.booking.booked) {
			this.router.navigate(["/bookings/select"]);
			return;
		}
		this.bookingConfirmed = true;
		setTimeout(() => {
			this.bookingConfirmed = false;
		}, 2500);
	}
}
