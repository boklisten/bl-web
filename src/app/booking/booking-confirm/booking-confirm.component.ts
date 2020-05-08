import { Component, OnInit } from "@angular/core";
import { BookingService } from "@wizardcoder/bl-connect";
import { Booking } from "@wizardcoder/bl-model";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../user/user.service";

@Component({
	selector: "app-booking-confirm",
	templateUrl: "./booking-confirm.component.html",
	styleUrls: ["./booking-confirm.component.scss"]
})
export class BookingConfirmComponent implements OnInit {
	private booking: Booking;
	constructor(
		private bookingService: BookingService,
		private route: ActivatedRoute,
		private userService: UserService,
		private router: Router
	) {}

	ngOnInit() {
		this.route.params.subscribe(params => {
			if (params.id) {
				this.bookingService
					.getById(params.id)
					.then(booking => {
						this.booking = booking;
					})
					.catch(e => {});
			}
		});
	}

	public async onConfrimBooking() {
		try {
			await this.bookingService.update(this.booking.id, {
				customer: this.userService.getUserDetailId(),
				booked: true
			});
		} catch (e) {
			console.log(e);
			throw new Error("could not confirm booking:" + e);
		}

		this.router.navigate(["/bookings/" + this.booking.id + "/confirmed"]);
	}
}
