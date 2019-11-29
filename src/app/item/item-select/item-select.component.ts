import { Component, OnInit } from "@angular/core";
import { Branch, Item } from "@wizardcoder/bl-model";
import { Router, ActivatedRoute } from "@angular/router";
import { BranchStoreService } from "../../branch/branch-store.service";
import { BranchService } from "@wizardcoder/bl-connect";

@Component({
	selector: "app-item-select",
	templateUrl: "./item-select.component.html",
	styleUrls: ["./item-select.component.scss"]
})
export class ItemSelectComponent implements OnInit {
	public items: Item[];
	public branch: Branch;
	public selectedCategories: string[];

	constructor(
		private _router: Router,
		private _branchStoreService: BranchStoreService,
		private _branchService: BranchService,
		private _route: ActivatedRoute
	) {
		this.selectedCategories = [];
		this.items = [];
	}

	ngOnInit() {
		const branchId = this._route.snapshot.queryParamMap.get("branch");
		console.log("branch", branchId);

		if (branchId) {
			this._branchService
				.getById(branchId)
				.then(branch => {
					this.branch = branch;

					console.log("got branch", this.branch);
				})
				.catch(() => {
					this.setBranchFromStore();
				});
		} else {
			this.setBranchFromStore();
		}

		this.selectedCategories = this._route.snapshot.queryParamMap.getAll(
			"category"
		);
	}

	private setBranchFromStore() {
		this.branch = this._branchStoreService.getBranch();
	}
}
