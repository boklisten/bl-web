import { Component, OnInit } from "@angular/core";
import { Booking } from "@wizardcoder/bl-model";
import { BookingService } from "@wizardcoder/bl-connect";
import { BranchStoreService } from "../../branch/branch-store.service";

@Component({
	selector: "app-booking-select",
	templateUrl: "./booking-select.component.html",
	styleUrls: ["./booking-select.component.scss"]
})
export class BookingSelectComponent implements OnInit {
	private branchId: string;
	private bookings: Booking[];
	private wait: boolean;

	constructor(
		private bookingService: BookingService,
		private branchStoreService: BranchStoreService
	) {
		this.wait = false;
	}

	ngOnInit() {
		this.branchId = this.branchStoreService.getBranchId();
		this.getBookings();

		this.branchStoreService.onBranchChange().subscribe(() => {
			this.branchId = this.branchStoreService.getBranchId();
			this.getBookings();
		});
	}

	private async getBookings() {
		this.wait = true;
		try {
			this.bookings = await this.bookingService.get({
				fresh: true,
				query: "?branchId=" + this.branchId
			});
		} catch (e) {}

		this.wait = false;
	}
}
