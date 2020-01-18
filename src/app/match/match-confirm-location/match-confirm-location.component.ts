import { Component, OnInit, Input, Output } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Match, MatchProfile, MatchState } from "@wizardcoder/bl-model";
import { MatchService } from "@wizardcoder/bl-connect";

type MatchEvent = { type: MatchState; time: Date; userId: string };

@Component({
	selector: "app-match-confirm-location",
	templateUrl: "./match-confirm-location.component.html",
	styleUrls: ["./match-confirm-location.component.scss"]
})
export class MatchConfirmLocationComponent implements OnInit {
	@Input() match: Match;
	@Input() customer: MatchProfile;
	@Input() counterparty: MatchProfile;

	public customerStatus;
	public counterpartyStatus;

	constructor(
		private modalService: NgbModal,
		private matchService: MatchService
	) {}

	ngOnInit() {
		this.updateStatus();
	}

	private getDismissReason(reason: any): string {
		if (reason === "Confirm location") {
			return "Confirm location";
		}
	}

	private updateStatus() {
		this.counterpartyStatus = this.checkForStatus(this.counterparty.userId);
		this.customerStatus = this.checkForStatus(this.customer.userId);
	}

	confirmLocation() {
		const event: MatchEvent = {
			type: "meeting-point-accepted",
			time: new Date(),
			userId: this.customer.userId
		} as any;

		this.match.events.push(event);

		this.matchService
			.update(this.match.id, { events: this.match.events })
			.then(() => {
				this.updateStatus();
			});
	}

	open(content) {
		this.modalService.open(content).result.then(
			result => {
				if (this.getDismissReason(result)) {
					this.confirmLocation();
				}
			},
			reason => {}
		);
	}

	private checkForStatus(customerId: string) {
		for (let event of this.match.events) {
			if (
				(event.type as any) === "meeting-point-accepted" &&
				event["userId"] === customerId
			) {
				return event.type;
			}
		}
		return null;
	}
}
