import { Component, OnInit } from "@angular/core";
import { Booking, Branch } from "@wizardcoder/bl-model";
import { BookingService } from "@wizardcoder/bl-connect";
import { BranchStoreService } from "../../branch/branch-store.service";
import { DateService } from "../../date/date.service";
import * as moment from "moment";
import { Router, ActivatedRoute } from "@angular/router";

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
	prePickedDate: Date;
	branch: Branch;

	constructor(
		private bookingService: BookingService,
		private branchStoreService: BranchStoreService,
		private dateService: DateService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.wait = false;
		this.pickedDate = new Date();
		this.bookings = [];
	}

	ngOnInit() {
		const queryBranchId = this.route.snapshot.queryParamMap.get("branch");
		const queryDate = this.route.snapshot.queryParamMap.get("date");

		if (queryDate) {
			this.pickedDate = moment(queryDate, "DDMMYYYYHHMM").toDate();
			this.prePickedDate = this.pickedDate;
		}

		/*if (queryBranchId) {*/
		//this.branchId = queryBranchId;
		//} else {
		//this.branchId = this.branchStoreService.getBranchId();
		//}

		this.updatePath();
		//this.getBookings();

		//this.branchStoreService.onBranchChange().subscribe(() => {
		//this.branchId = this.branchStoreService.getBranchId();
		//this.getBookings();
		//});
	}

	onPickedDate(date: Date) {
		this.pickedDate = date;
		this.getBookings();
		this.updatePath();
	}

	onBranchPicked(branch: any) {
		this.branch = branch;
		if (this.branch) {
			this.getBookings();
		} else {
			this.bookings = [];
		}
	}

	private updatePath() {
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: {
				date: this.dateService.onFormat(
					this.pickedDate,
					"DDMMYYYYHHMM"
				),
				branch: this.branchId
			}
		});
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
					this.branch.id +
					"&booked=false" +
					"&from=>" +
					this.dateService.onFormat(
						fromDate.toDate(),
						"DDMMYYYYHHMM"
					) +
					"&from=<" +
					this.dateService.onFormat(toDate.toDate(), "DDMMYYYYHHMM")
			});
		} catch (e) {
			this.bookings = [];
		}

		this.wait = false;
	}
}
