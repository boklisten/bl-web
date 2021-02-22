import { Component, Input, OnInit } from "@angular/core";
import { Branch } from "@boklisten/bl-model";

@Component({
	selector: "app-branch-contact-info",
	templateUrl: "./branch-contact-info.component.html",
	styleUrls: ["./branch-contact-info.component.scss"],
})
export class BranchContactInfoComponent implements OnInit {
	@Input() branch: Branch;

	constructor() {}

	ngOnInit() {}
}
