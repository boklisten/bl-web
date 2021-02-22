import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-logout",
	templateUrl: "./logout.component.html",
	styleUrls: ["./logout.component.scss"],
})
export class LogoutComponent implements OnInit {
	constructor(private _router: Router) {}

	ngOnInit() {
		setTimeout(() => {
			this._router.navigate(["welcome"]);
		}, 2500);
	}
}
