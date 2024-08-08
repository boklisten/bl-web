import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-info",
	templateUrl: "./info.component.html",
	styleUrls: ["./info.component.scss"],
})
export class InfoComponent implements OnInit {
	public showInfoMenu: boolean;
	public selectedMenuButton: string;

	constructor(private router: Router) {
		this.selectedMenuButton = "general";
	}

	ngOnInit() {}

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
