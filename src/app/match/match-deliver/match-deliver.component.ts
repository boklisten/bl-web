import { Component, OnInit } from "@angular/core";
import { MatchService } from "@wizardcoder/bl-connect";
import { Match, MatchProfile } from "@wizardcoder/bl-model";
import { UserService } from "../../user/user.service";
import { MatchStoreService } from "../match-store/match-store.service";

@Component({
	selector: "app-match-deliver",
	templateUrl: "./match-deliver.component.html",
	styleUrls: ["./match-deliver.component.scss"]
})
export class MatchDeliverComponent implements OnInit {
	match: Match;

	constructor(
		private matchStoreService: MatchStoreService,
		private userService: UserService
	) {}

	ngOnInit() {
		this.match = this.matchStoreService.getMatch();
		this.matchStoreService.onMatchChange().subscribe(() => {
			this.match = this.matchStoreService.getMatch();
		});
	}

	public getItemsForReciever(match: Match, reciever: MatchProfile) {
		return match.items.filter(item => {
			return item.reciever.toString() === reciever.userId.toString();
		});
	}
}
