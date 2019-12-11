import { Component, OnInit } from "@angular/core";
import { MatchService } from "@wizardcoder/bl-connect";
import { Match, MatchProfile } from "@wizardcoder/bl-model";
import { UserService } from "../../user/user.service";

@Component({
	selector: "app-match-deliver",
	templateUrl: "./match-deliver.component.html",
	styleUrls: ["./match-deliver.component.scss"]
})
export class MatchDeliverComponent implements OnInit {
	matches: Match[];

	constructor(
		private matchService: MatchService,
		private userService: UserService
	) {}

	ngOnInit() {
		this.matchService
			.get({
				query:
					"?=sender.customerId=" + this.userService.getUserDetailId()
			})
			.then(matches => {
				console.log("got matches", matches);
				this.matches = matches;
			})
			.catch(err => {
				console.log("error getting matches", err);
			});
	}

	public getItemsForReciever(match: Match, reciever: MatchProfile) {
		return match.items.filter(item => {
			return item.reciever.toString() === reciever.userId.toString();
		});
	}
}
