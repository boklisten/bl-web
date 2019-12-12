import { Component, OnInit } from "@angular/core";
import { Match } from "@wizardcoder/bl-model";
import { MatchStoreService } from "../match-store/match-store.service";

@Component({
	selector: "app-match-recieve",
	templateUrl: "./match-recieve.component.html",
	styleUrls: ["./match-recieve.component.scss"]
})
export class MatchRecieveComponent implements OnInit {
	public match: Match;

	constructor(private matchStoreService: MatchStoreService) {}

	ngOnInit() {
		this.match = this.matchStoreService.getMatch();

		this.matchStoreService.onMatchChange().subscribe(() => {
			this.match = this.matchStoreService.getMatch();
		});
	}
}
