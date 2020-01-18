import { Component, OnInit } from "@angular/core";
import { MatchService } from "@wizardcoder/bl-connect";
import { Match, MatchProfile } from "@wizardcoder/bl-model";
import { UserService } from "../../user/user.service";
import { MatchStoreService } from "../match-store/match-store.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: "app-match-deliver",
	templateUrl: "./match-deliver.component.html",
	styleUrls: ["./match-deliver.component.scss"]
})
export class MatchDeliverComponent implements OnInit {
	match: Match;
	showHandover: boolean;

	constructor(
		private matchStoreService: MatchStoreService,
		private userService: UserService,
		private modalService: NgbModal
	) {}

	ngOnInit() {
		this.match = this.matchStoreService.getMatch();
		this.matchStoreService.onMatchChange().subscribe(() => {
			this.match = this.matchStoreService.getMatch();
		});
	}

	bothPartiesConfirmed() {
		this.showHandover = true;
	}

	public getItemsForReciever(match: Match, reciever: MatchProfile) {
		return match.items.filter(item => {
			return item.reciever.toString() === reciever.userId.toString();
		});
	}
	open(content) {
		this.modalService.open(content).result.then(result => {}, reason => {});
	}
}
