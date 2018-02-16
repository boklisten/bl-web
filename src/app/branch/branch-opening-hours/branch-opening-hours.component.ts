import {Component, Input, OnInit} from '@angular/core';
import {BlApiError, Branch, OpeningHour} from "bl-model";
import {OpeningHourService} from "bl-connect";
import {BranchOpeningHoursService} from "./branch-opening-hours.service";

@Component({
	selector: 'app-branch-opening-hours',
	templateUrl: './branch-opening-hours.component.html',
	styleUrls: ['./branch-opening-hours.component.scss']
})
export class BranchOpeningHoursComponent implements OnInit {
	@Input() branch: Branch;
	
	public openingHours: OpeningHour[];
	
	constructor(private _branchOpeningHoursService: BranchOpeningHoursService) {
		this.openingHours = [];
	}
	
	ngOnInit() {
		this._branchOpeningHoursService.getOpeningHours(this.branch).then((openingHours: OpeningHour[]) => {
			this.openingHours = openingHours;
		}).catch(() => {
			console.log('there was an error getting opening hours');
		});
	}
	
	
}
