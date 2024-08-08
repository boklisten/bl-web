import { Component, OnInit } from "@angular/core";
import { BlNextLinkerService } from "./bl-next-linker.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-bl-next-linker",
	templateUrl: "./bl-next-linker.component.html",
})
export class BlNextLinkerComponent implements OnInit {
	constructor(
		private router: Router,
		private blNextLinkerService: BlNextLinkerService
	) {}

	ngOnInit(): void {
		this.blNextLinkerService.redirectToBlNext(this.router.url);
	}
}
