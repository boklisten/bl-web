import { Component, OnInit } from "@angular/core";
import { BlNextLinkerService } from "../bl-next-linker/bl-next-linker.service";

@Component({
	selector: "app-peer-to-peer-linker",
	templateUrl: "./peer-to-peer-linker.component.html",
})
export class PeerToPeerLinkerComponent implements OnInit {
	constructor(private blNextLinkerService: BlNextLinkerService) {}

	ngOnInit(): void {
		this.blNextLinkerService.redirectToBlNext("matches", true);
	}
}
