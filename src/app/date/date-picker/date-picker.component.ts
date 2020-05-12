import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "app-date-picker",
	templateUrl: "./date-picker.component.html",
	styleUrls: ["./date-picker.component.scss"]
})
export class DatePickerComponent implements OnInit {
	@Input() pickedDate: Date;
	@Output() pickedDateChange: EventEmitter<Date>;
	public standardDate: Date;

	constructor() {
		this.pickedDateChange = new EventEmitter<Date>();
		this.standardDate = new Date();
	}

	ngOnInit() {}

	onPickedDate(date) {
		this.pickedDateChange.emit(date);
	}
}
