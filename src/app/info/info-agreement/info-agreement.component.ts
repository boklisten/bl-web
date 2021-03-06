import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "app-info-agreement",
	templateUrl: "./info-agreement.component.html",
	styleUrls: ["./info-agreement.component.scss"],
})
export class InfoAgreementComponent implements OnInit {
	public selectedTab = "conditions";
	public showPolicyMenu = false;
	constructor(private route: ActivatedRoute, private router: Router) {}

	ngOnInit() {
		this.selectTab(this.route.snapshot.firstChild.url[0].path);

		this.router.events.subscribe(() => {
			this.selectTab(this.route.snapshot.firstChild.url[0].path);
		});
	}

	public selectTab(tabName: string) {
		this.selectedTab = tabName;
		this.showPolicyMenu = false;
	}
}
