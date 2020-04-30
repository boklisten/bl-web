import { Component, OnInit } from "@angular/core";
import { BookingService } from "@wizardcoder/bl-connect";
import { Booking } from "@wizardcoder/bl-model";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-booking-confirm",
	templateUrl: "./booking-confirm.component.html",
	styleUrls: ["./booking-confirm.component.scss"]
})
export class BookingConfirmComponent implements OnInit {
	private booking: Booking;
	constructor(
		private bookingService: BookingService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.route.params.subscribe(params => {
			if (params.id) {
				console.log("PARAM", params["id"]);
				this.bookingService
					.getById(params.id)
					.then(booking => {
						this.booking = booking;
					})
					.catch(e => {});
			}
		});
	}
}
