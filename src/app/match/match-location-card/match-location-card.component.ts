import { Component, OnInit, Input } from "@angular/core";
import { Location, Match } from "@boklisten/bl-model";

@Component({
	selector: "app-match-location-card",
	templateUrl: "./match-location-card.component.html",
	styleUrls: ["./match-location-card.component.scss"]
})
export class MatchLocationCardComponent implements OnInit {
	@Input() match: Match;
	public location: Location;
	public time: Date;

	constructor() {}

	ngOnInit() {
		const meetingPoint = this.match.meetingPoint[0];
		this.location = meetingPoint.location;
		this.time = meetingPoint.time;
	}
}
