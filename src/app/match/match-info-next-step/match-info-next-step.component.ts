import { Component, OnInit } from "@angular/core";
import { MatchHelperService } from "../match-helper/match-helper.service";
import { Match } from "@boklisten/bl-model";
import { CartService } from "../../cart/cart.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-match-info-next-step",
	templateUrl: "./match-info-next-step.component.html",
	styleUrls: ["./match-info-next-step.component.scss"],
})
export class MatchInfoNextStepComponent implements OnInit {
	public match: Match;
	constructor(
		private matchHelperService: MatchHelperService,
		private cartService: CartService,
		private router: Router
	) {
		this.match = null;
	}

	ngOnInit() {
		this.match = this.matchHelperService.getCurrentMatch();
	}

	onContinue() {
		if (!this.cartService.isEmpty()) {
			this.router.navigate(["/cart"]);
		} else {
			this.router.navigate(["/u/items"]);
		}
	}
}
