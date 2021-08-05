import { Component, OnInit } from "@angular/core";
import { BranchService } from "@boklisten/bl-connect";

@Component({
	selector: "app-fastbuy-select-region",
	templateUrl: "./fastbuy-select-region.component.html",
	styleUrls: ["./fastbuy-select-region.component.scss"],
})
export class FastbuySelectRegionComponent implements OnInit {
	public regions: { name: string; params?: any }[];
	public link = "/fastbuy/branches";

	constructor(private branchService: BranchService) {
		this.regions = [
			{
				name: "Nettstudier",
				params: { region: "nettstudier" },
			},
			{ name: "Bergen", params: { region: "bergen" } },
			{ name: "Drammen", params: { region: "drammen" } },
			{ name: "Fredrikstad", params: { region: "fredrikstad" } },
			{ name: "Lillestrøm", params: { region: "lillestrøm" } },
			{ name: "Oslo", params: { region: "oslo" } },
			{ name: "Romerike", params: { region: "romerike" } },
			{ name: "Stavanger", params: { region: "stavanger" } },
			{ name: "Trondheim", params: { region: "trondheim" } },
			{ name: "Ski", params: { region: "ski" } },
		];
	}

	ngOnInit() {}
}
