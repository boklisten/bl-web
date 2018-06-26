import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {BlApiError, Branch, OpeningHour} from "@wizardcoder/bl-model";
import {OpeningHourService} from "@wizardcoder/bl-connect";
import {BranchOpeningHoursService} from "./branch-opening-hours.service";
import {DateService} from "../../date/date.service";

@Component({
	selector: 'app-branch-opening-hours',
	templateUrl: './branch-opening-hours.component.html',
	styleUrls: ['./branch-opening-hours.component.scss']
})
export class BranchOpeningHoursComponent implements OnInit, OnChanges {
	@Input() branch: Branch;

	public openingHours: OpeningHour[];

	constructor(private _branchOpeningHoursService: BranchOpeningHoursService, private _dateService: DateService) {
		this.openingHours = [];
	}

	ngOnInit() {
	}

	ngOnChanges() {
		this._branchOpeningHoursService.getOpeningHours(this.branch).then((openingHours: OpeningHour[]) => {
			this.openingHours = openingHours;
		}).catch(() => {
			console.log('there was an error getting opening hours');
		});
	}

	isTodayAfter(date): boolean {
		return this._dateService.isTodayAfter(date);
	}


}
