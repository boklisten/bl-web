import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BookingService } from "@boklisten/bl-connect";
import { Booking } from "@boklisten/bl-model";

@Component({
	selector: "app-booking-cancel",
	templateUrl: "./booking-cancel.component.html",
	styleUrls: ["./booking-cancel.component.scss"],
})
export class BookingCancelComponent implements OnInit {
	public booking: Booking;
	public cancelationConfirmed: boolean;
	public canelationFailed: boolean;
	public wait: boolean;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private bookingService: BookingService
	) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			if (params.id) {
				this.wait = true;
				this.bookingService
					.getById(params.id)
					.then((booking) => {
						this.booking = booking;
						this.wait = false;
					})
					.catch((e) => {
						this.wait = false;
					});
			}
		});
	}

	public onConfirmCancelation() {
		this.wait = true;

		this.bookingService
			.update(this.booking.id, { customer: null, booked: false })
			.then(() => {
				this.wait = false;
				this.cancelationConfirmed = true;
				setTimeout(() => {
					this.router.navigate(["/bookings/customer/list"]);
				}, 2500);
			})
			.catch(() => {
				this.wait = false;
			});
	}
}
