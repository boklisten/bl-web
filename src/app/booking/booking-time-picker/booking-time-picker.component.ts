import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	OnChanges,
	SimpleChanges
} from "@angular/core";
import { Booking, Branch } from "@boklisten/bl-model";
import { BookingService, BranchService } from "@boklisten/bl-connect";
import * as moment from "moment";
import { DateService } from "../../date/date.service";

@Component({
	selector: "app-booking-time-picker",
	templateUrl: "./booking-time-picker.component.html",
	styleUrls: ["./booking-time-picker.component.scss"]
})
export class BookingTimePickerComponent implements OnInit, OnChanges {
	@Input() branch: Branch;
	@Input() prePicked: Date;
	@Output() picked: EventEmitter<Date>;

	public wait: boolean;
	public bookableDates: Date[];
	public selectedDate: Date;

	constructor(
		private bookingService: BookingService,
		private dateService: DateService,
		private branchService: BranchService
	) {
		this.picked = new EventEmitter<Date>();
		this.bookableDates = [];
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes["branch"]) {
			if (
				changes["branch"]["currentValue"] &&
				!changes["branch"]["firstChange"]
			) {
				this.onChangeDate();
				this.getBookableDates();
			}
		}

		if (changes["prePicked"]) {
			if (changes["prePicked"]["currentValue"]) {
				this.selectedDate = changes["prePicked"]["currentValue"];
				this.getBookableDates();
			}
		}
	}

	ngOnInit() {}

	public pick(date: Date) {
		this.selectedDate = date;
		this.picked.emit(this.selectedDate);
	}

	public onChangeDate() {
		this.selectedDate = null;
		this.picked.emit(null);
	}

	private getBookableDates() {
		if (!this.branch) {
			this.bookableDates = [];
			return;
		}
		this.bookableDates = [];
		this.wait = true;

		this.branchService
			.getWithOperation(this.branch.id, "booking-dates")
			.then((bookingDates: any) => {
				this.bookableDates = bookingDates.map(bookingDate => {
					return bookingDate.from;
				});
				this.sortDates();

				this.wait = false;
			})
			.catch(e => {
				console.log("could not get bookings", e);
				this.wait = false;
			});
	}

	private sortDates() {
		this.bookableDates.sort((a, b) => moment(a).unix() - moment(b).unix());
	}
}
