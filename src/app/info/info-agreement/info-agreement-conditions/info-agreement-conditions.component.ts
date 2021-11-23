import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "app-info-agreement-conditions",
	templateUrl: "./info-agreement-conditions.component.html",
	styleUrls: ["./info-agreement-conditions.component.scss"],
})
export class InfoAgreementConditionsComponent implements OnInit {
	@Input() collapsable = false;
	public isCollapsed: boolean;
	constructor() {}

	ngOnInit() {
		this.isCollapsed = this.collapsable;
	}
}
