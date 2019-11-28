import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BranchService } from "@wizardcoder/bl-connect";
import { Branch } from "@wizardcoder/bl-model";
import { BranchStoreService } from "../../branch/branch-store.service";

@Component({
	selector: "app-fastbuy-select-branch",
	templateUrl: "./fastbuy-select-branch.component.html",
	styleUrls: ["./fastbuy-select-branch.component.scss"]
})
export class FastbuySelectBranchComponent implements OnInit {
	private region: string;
	public branches: { name: string; params: any }[];
	public link = "/fastbuy/courses";
	public wait: boolean;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private branchService: BranchService,
		private branchStoreService: BranchStoreService
	) {}

	ngOnInit() {
		this.region = this.route.snapshot.queryParamMap.get("region");
		this.wait = true;

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
							branch: branch,
							params: { branch: branch.id }
						});
					}
				}
				this.branches = branchNames as any;

				this.region =
					this.region.charAt(0).toUpperCase() + this.region.slice(1);

				this.wait = false;
			})
			.catch(() => {
				this.wait = false;
			});
	}

	public onBranchSelect(branch: Branch) {
		this.wait = true;
		this.branchStoreService
			.setBranch(branch)
			.then(() => {
				this.wait = false;
				this.router.navigate([
					"fastbuy/courses",
					{ queryParams: { branch: branch.id } }
				]);
			})
			.catch(() => {
				this.wait = false;
			});
	}
}
