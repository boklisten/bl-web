import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	OnChanges,
	SimpleChanges
} from "@angular/core";
import { Booking, Branch } from "@wizardcoder/bl-model";
import { BookingService } from "@wizardcoder/bl-connect";
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
		private dateService: DateService
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
				this.getBookings();
			}
		}

		if (changes["prePicked"]) {
			if (changes["prePicked"]["currentValue"]) {
				this.selectedDate = changes["prePicked"]["currentValue"];
				this.getBookings();
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

	private getBookings() {
		if (!this.branch) {
			this.bookableDates = [];
			return;
		}
		this.wait = true;
		this.bookingService
			.get({
				query:
					"?og=from&from=>" +
					this.dateService.onFormat(new Date(), "DDMMYYYYHHMM")
			})
			.then(bookings => {
				for (let booking of bookings) {
					this.addToBookableDates(booking.from);
				}
				this.wait = false;
			})
			.catch(e => {
				console.log("could not get bookings", e);
				this.wait = false;
			});
	}

	private addToBookableDates(bookingDate: Date) {
		for (let bookableDate of this.bookableDates) {
			if (moment(bookableDate).isSame(bookingDate, "day")) {
				return;
			}
		}
		this.bookableDates.push(bookingDate);
	}
}
