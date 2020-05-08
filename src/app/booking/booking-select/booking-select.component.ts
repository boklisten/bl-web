import { Component, OnInit } from "@angular/core";
import { Booking } from "@wizardcoder/bl-model";
import { BookingService } from "@wizardcoder/bl-connect";
import { BranchStoreService } from "../../branch/branch-store.service";
import { DateService } from "../../date/date.service";
import * as moment from "moment";

@Component({
	selector: "app-booking-select",
	templateUrl: "./booking-select.component.html",
	styleUrls: ["./booking-select.component.scss"]
})
export class BookingSelectComponent implements OnInit {
	branchId: string;
	bookings: Booking[];
	wait: boolean;
	pickedDate: Date;

	constructor(
		private bookingService: BookingService,
		private branchStoreService: BranchStoreService,
		private dateService: DateService
	) {
		this.wait = false;
		this.pickedDate = new Date(2020, 5, 2);
	}

	ngOnInit() {
		this.branchId = this.branchStoreService.getBranchId();
		this.getBookings();

		this.branchStoreService.onBranchChange().subscribe(() => {
			this.branchId = this.branchStoreService.getBranchId();
			this.getBookings();
		});
	}

	onPickedDate(date: Date) {
		console.log("picked date", date);
		this.pickedDate = date;
		this.getBookings();
	}

	private async getBookings() {
		this.wait = true;

		this.bookings = [];

		let fromDate = moment(this.pickedDate)
			.set("hour", 0)
			.set("minute", 0);

		const toDate = moment(fromDate).add("day", 1);

		try {
			this.bookings = await this.bookingService.get({
				fresh: true,
				query:
					"?og=from&og=to&branchId=" +
					this.branchId +
					"&booked=false" +
					"&from=>" +
					this.dateService.onFormat(
						fromDate.toDate(),
						"DDMMYYYYHHMM"
					) +
					"&from=<" +
					this.dateService.onFormat(toDate.toDate(), "DDMMYYYYHHMM")
			});
		} catch (e) {}

		this.wait = false;
	}
}
