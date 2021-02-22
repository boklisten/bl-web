import { Component, OnInit } from "@angular/core";
import { MatchService } from "@boklisten/bl-connect";
import { Match } from "@boklisten/bl-model";
import { ActivatedRoute } from "@angular/router";
import { MatchStoreService } from "../match-store/match-store.service";

@Component({
	selector: "app-match-detail",
	templateUrl: "./match-detail.component.html",
	styleUrls: ["./match-detail.component.scss"],
})
export class MatchDetailComponent implements OnInit {
	public match: Match;
	public wait: boolean;

	constructor(
		private matchStoreService: MatchStoreService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.wait = true;
		const matchId = this.route.snapshot.paramMap.get("id");
		this.matchStoreService
			.setMatch(matchId)
			.then((match) => {
				this.match = match;
				this.wait = false;
			})
			.catch(() => {
				this.wait = false;
			});
	}
}
