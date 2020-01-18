import { Component, OnInit, Input } from "@angular/core";
import { Match, MatchProfile, MatchItem } from "@wizardcoder/bl-model";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatchService } from "@wizardcoder/bl-connect";

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
	private items: MatchItem[];

	constructor(
		private modalService: NgbModal,
		private matchService: MatchService
	) {
		this.items = [];
	}

	ngOnInit() {
		this.extractItems();
	}

	private confirmSelectedItems() {}

	private selectItem(item: MatchItem) {
		if (this.sender) {
			if (item.sent) {
				item.sent = null;
			} else {
				item.sent = { time: new Date() };
			}
		} else {
			if (item.recieved) {
				item.recieved = null;
			} else {
				item.recieved = { time: new Date() };
			}
		}
	}

	private extractItems() {
		for (let item of this.match.items) {
			if (item.reciever === this.counterparty.userId) {
				this.items.push(item);
			}
		}
	}

	private itemsSelected() {
		for (let item of this.items) {
			if (this.sender) {
				if (item.sent) return true;
			} else {
				if (item.reciever) return true;
			}
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
				}
			},
			reason => {}
		);
	}
}
