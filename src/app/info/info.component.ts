import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
	selector: "app-info",
	templateUrl: "./info.component.html",
	styleUrls: ["./info.component.scss"],
})
export class InfoComponent implements OnInit {
	public showInfoMenu: boolean;
	public selectedMenuButton: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private location: Location
	) {
		this.selectedMenuButton = "general";
	}

	ngOnInit() {
		this.selectTab(this.route.snapshot.firstChild.url[0].path);
	}

	private selectTab(tabName: string) {
		switch (tabName) {
			case "faq":
				this.selectedMenuButton = "faq";
				break;
			case "general":
				this.selectedMenuButton = "general";
				break;
			case "pupils":
				this.selectedMenuButton = "pupils";
				break;
			case "branch":
				this.selectedMenuButton = "branch";
				break;
			case "policies":
				this.selectedMenuButton = "policies";
				break;
			case "about":
				this.selectedMenuButton = "about";
				break;
			case "companies":
				this.selectedMenuButton = "companies";
				break;
			case "contact":
				this.selectedMenuButton = "contact";
				break;
			case "buyback":
				this.selectedMenuButton = "buyback";
				break;
			case "matching":
				this.selectedMenuButton = "matching";
				break;
			case "covid-19":
				this.selectedMenuButton = "covid-19";
				break;
			default:
				this.selectedMenuButton = "general";
		}
	}

	onShowInfoMenu() {
		this.showInfoMenu = !this.showInfoMenu;
	}

	onSelectMenuButton(menuButton: string) {
		this.selectedMenuButton = menuButton;
		this.showInfoMenu = false;
		this.router.navigate(["info/" + this.selectedMenuButton]);
	}
}
