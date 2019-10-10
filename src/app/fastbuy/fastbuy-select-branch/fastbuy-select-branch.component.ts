import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BranchStoreService } from "../../branch/branch-store.service";
import { BranchService } from "@wizardcoder/bl-connect";
import { Branch } from "@wizardcoder/bl-model";

@Component({
	selector: "app-fastbuy-select-branch",
	templateUrl: "./fastbuy-select-branch.component.html",
	styleUrls: ["./fastbuy-select-branch.component.scss"]
})
export class FastbuySelectBranchComponent implements OnInit {
	private region: string;
	public branches: { name: string; params: any }[];
	public link = "/fastbuy/courses";

	constructor(
		private route: ActivatedRoute,
		private branchStoreService: BranchStoreService,
		private branchService: BranchService
	) {}

	ngOnInit() {
		this.region = this.route.snapshot.queryParamMap.get("region");

		this.branchService
			.get()
			.then((branches: Branch[]) => {
				const branchNames = [];

				for (const branch of branches) {
					if (
						branch.name
							.toLowerCase()
							.toString()
							.indexOf(this.region.toLowerCase()) >= 0
					) {
						let name = branch.name
							.toLowerCase()
							.replace(this.region, "");

						name = name.charAt(0).toUpperCase() + name.slice(1);

						branchNames.push({
							name: name,
							params: { branch: branch.id }
						});
					}
				}
				this.branches = branchNames as any;

				this.region =
					this.region.charAt(0).toUpperCase() + this.region.slice(1);
			})
			.catch(() => {});
	}
}
