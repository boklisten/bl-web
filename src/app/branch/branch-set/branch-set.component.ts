import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-branch-set",
	templateUrl: "./branch-set.component.html",
	styleUrls: ["./branch-set.component.scss"],
})
export class BranchSetComponent implements OnInit {
	constructor(private _router: Router) {}

	ngOnInit() {}

	onBranchSelect() {
		this._router.navigateByUrl("/i/select");
	}
}
