import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { BranchService } from "@wizardcoder/bl-connect";
import { BlApiError, BlApiNotFoundError, Branch } from "@wizardcoder/bl-model";
import { BranchStoreService } from "../branch-store.service";

@Component({
	selector: "app-branch-info",
	templateUrl: "./branch-info.component.html",
	styleUrls: ["./branch-info.component.scss"]
})
export class BranchInfoComponent implements OnInit {
	public branch: Branch;
	public warning: boolean;
	public branches: Branch[];
	public selectedBranch: Branch;
	public showBranchMenu: boolean;
	public loading: boolean;

	constructor(
		private _branchService: BranchService,
		private _branchStoreService: BranchStoreService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.branches = [];
	}

	ngOnInit() {
		this.selectedBranch = this._branchStoreService.getBranch();

		let branchId = this.route.snapshot.paramMap.get("id");
		this.loading = true;

		this._branchService
			.get()
			.then((branches: Branch[]) => {
				this.branches = branches;

				this.branches.sort((a: any, b: any) => {
					const nameA = a.name.toUpperCase();
					const nameB = b.name.toUpperCase();
					if (nameA < nameB) {
						return -1;
					} else if (nameA > nameB) {
						return 1;
					}
					return 0;
				});

				if (branchId) {
					this.selectByIdOrName(branchId);
				} else {
					if (!this.selectedBranch) {
						this.selectedBranch = this.branches[0];
					}
				}

				this.loading = false;
			})
			.catch(getBranchesError => {
				console.log(
					"BranchInfoComponent: could not get brances",
					getBranchesError
				);
				this.loading = false;
			});
	}

	private selectByIdOrName(idOrName: string) {
		for (let branch of this.branches) {
			if (branch.name === idOrName || branch.id === idOrName) {
				this.selectedBranch = branch;
				return;
			}
		}
		this.selectedBranch = this.branches[0];
	}

	public onShowBranchMenu() {
		this.showBranchMenu = !this.showBranchMenu;
	}

	public onBranchSelect(branch: Branch) {
		window.scroll(0, 0);
		this.selectedBranch = branch;
		this.showBranchMenu = false;
		this.router.navigate(["/info/branch/" + branch.id]);
	}
}
