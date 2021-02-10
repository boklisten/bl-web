import { Component, OnInit } from "@angular/core";
import { Match, MatchProfile } from "@boklisten/bl-model";
import { MatchStoreService } from "../match-store/match-store.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-match-recieve",
	templateUrl: "./match-recieve.component.html",
	styleUrls: ["./match-recieve.component.scss"]
})
export class MatchRecieveComponent implements OnInit {
	public match: Match;
	public recieverId: string;
	public itemsToRecieve: any[];
	public reciever: MatchProfile;
	public showHandover: boolean;

	constructor(
		private matchStoreService: MatchStoreService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.recieverId = this.route.snapshot.queryParamMap.get("r");

		if (!this.recieverId) {
			this.router.navigate(["match/failure"]);
		}

		this.match = this.matchStoreService.getMatch();
		if (this.match) {
			this.setItemsToRecieve();
			this.getReciever();
		}

		this.matchStoreService.onMatchChange().subscribe(() => {
			this.match = this.matchStoreService.getMatch();
			this.setItemsToRecieve();
			this.getReciever();
		});
	}

	bothPartiesConfirmed() {
		this.showHandover = true;
	}
	private getReciever() {
		for (let reciever of this.match.recievers) {
			if (reciever.userId === this.recieverId) {
				this.reciever = reciever;
				return;
			}
		}
	}

	private setItemsToRecieve() {
		this.itemsToRecieve = this.filterItemsForReciever(
			this.match,
			this.recieverId
		);
	}

	private filterItemsForReciever(match: Match, recieverId: string) {
		if (!match) return [];
		return match.items.filter(item => {
			return item.reciever === recieverId;
		});
	}
}
