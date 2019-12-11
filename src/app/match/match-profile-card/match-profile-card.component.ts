import { Component, OnInit, Input } from "@angular/core";
import { Match, MatchProfile } from "@wizardcoder/bl-model";

@Component({
	selector: "app-match-profile-card",
	templateUrl: "./match-profile-card.component.html",
	styleUrls: ["./match-profile-card.component.scss"]
})
export class MatchProfileCardComponent implements OnInit {
	@Input() profile: MatchProfile;

	constructor() {}

	ngOnInit() {}
}
