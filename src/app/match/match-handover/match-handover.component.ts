import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Match, MatchProfile, MatchItem } from "@wizardcoder/bl-model";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatchService } from "@wizardcoder/bl-connect";
import { MatchStoreService } from "../match-store/match-store.service";

@Component({
	selector: "app-match-handover",
	templateUrl: "./match-handover.component.html",
	styleUrls: ["./match-handover.component.scss"]
})
export class MatchHandoverComponent implements OnInit {
	@Input() match: Match;
	@Input() counterparty: MatchProfile;
	@Input() customer: MatchProfile;
	@Input() sender: boolean;
	private items: {
		selected: boolean;
		item: string;
		title: string;
	}[];

	constructor(
		private modalService: NgbModal,
		private matchService: MatchService,
		private matchStoreService: MatchStoreService,
		private router: Router
	) {
		this.items = [];
	}

	ngOnInit() {
		this.extractItems();
	}

	private confirmSelectedItems() {
		this.matchStoreService
			.addHandoverItems(this.customer.userId, this.items, this.sender)
			.then(() => {
				this.router.navigate(["/match/success"]);
			})
			.catch(err => {
				this.router.navigate(["/match/failure"]);
			});
	}

	private selectItem(item) {
		item.selected = !item.selected;
	}

	private extractItems() {
		for (let item of this.match.items) {
			if (
				(this.sender && item.reciever === this.counterparty.userId) ||
				(!this.sender && item.reciever === this.customer.userId)
			) {
				this.items.push({
					item: item.item,
					selected: false,
					title: item.title
				});
			}
		}
	}

	private itemsSelected() {
		for (let item of this.items) {
			if (item.selected) return true;
		}
		return false;
	}

	private getDismissReason(reason: any): string {
		if (reason === "Confirm location") {
			return "Confirm location";
		}
	}

	open(content) {
		this.modalService.open(content).result.then(
			result => {
				if (this.getDismissReason(result)) {
					this.confirmSelectedItems();
				}
			},
			reason => {}
		);
	}
}
