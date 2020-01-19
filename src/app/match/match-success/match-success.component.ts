import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-match-success",
	templateUrl: "./match-success.component.html",
	styleUrls: ["./match-success.component.scss"]
})
export class MatchSuccessComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit() {
		setTimeout(() => {
			this.router.navigate(["/welcome"]);
		}, 2500);
	}
}
