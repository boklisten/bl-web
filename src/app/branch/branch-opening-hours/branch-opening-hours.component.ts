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
	public loading: boolean;
	public openingHours: OpeningHour[];

	constructor(private _branchOpeningHoursService: BranchOpeningHoursService, private _dateService: DateService) {
		this.openingHours = [];
	}

	ngOnInit() {
	}

	ngOnChanges() {
		this.openingHours = [];

		if (!this.branch || !this.branch.openingHours || this.branch.openingHours.length <= 0) {
			return;
		}

		this.loading = true;

		this._branchOpeningHoursService.getOpeningHours(this.branch).then((openingHours: OpeningHour[]) => {
			this.openingHours = this.removeInactiveOpeningHours(openingHours);

			this.loading = false;
		}).catch(() => {
			console.log('there was an error getting opening hours');
			this.loading = false;
		});
  }

  private removeInactiveOpeningHours(openingHours: OpeningHour[]): OpeningHour[] {
    const ohs: OpeningHour[] = [];

    for (let oh of openingHours) {
      if (this.isDateStillActive(oh.to)) {
        ohs.push(oh);
      }
    }

    return ohs;
  }

	isDateStillActive(date: Date): boolean {
		return this._dateService.isDateStillActive(date);
	}


}
