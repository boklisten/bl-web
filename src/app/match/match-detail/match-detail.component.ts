import { Component, OnInit } from "@angular/core";
import { MatchService } from "@wizardcoder/bl-connect";
import { Match } from "@wizardcoder/bl-model";
import { ActivatedRoute } from "@angular/router";
import { MatchStoreService } from "../match-store/match-store.service";

@Component({
	selector: "app-match-detail",
	templateUrl: "./match-detail.component.html",
	styleUrls: ["./match-detail.component.scss"]
})
export class MatchDetailComponent implements OnInit {
	public match: Match;

	constructor(
		private matchStoreService: MatchStoreService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		const matchId = this.route.snapshot.paramMap.get("id");
		this.matchStoreService
			.setMatch(matchId)
			.then(match => {
				this.match = match;
			})
			.catch(() => {});
	}
}
