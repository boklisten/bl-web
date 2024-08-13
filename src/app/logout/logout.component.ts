import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BlNextLinkerService } from "../bl-next-linker/bl-next-linker.service";

@Component({
	selector: "app-logout",
	templateUrl: "./logout.component.html",
	styleUrls: ["./logout.component.scss"],
})
export class LogoutComponent implements OnInit {
	constructor(
		private _router: Router,
		private _blNextLinkerService: BlNextLinkerService
	) {}

	ngOnInit() {
		this._blNextLinkerService.handleLogout();
		setTimeout(() => {
			this._router.navigate(["welcome"], { replaceUrl: true });
		}, 2500);
	}
}
