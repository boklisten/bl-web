import { Component, OnInit } from "@angular/core";
import { Branch, Item } from "@wizardcoder/bl-model";
import { Router, ActivatedRoute } from "@angular/router";
import { BranchStoreService } from "../../branch/branch-store.service";

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
		private _route: ActivatedRoute
	) {}

	ngOnInit() {
		this.branch = this._branchStoreService.getBranch();

		this.selectedCategories = this._route.snapshot.queryParamMap.getAll(
			"category"
		);
	}

	onBranchSelectClick() {
		this._branchStoreService.redirectUrl = "/i/select";
		this._router.navigate(["/b/select"]);
	}
}
