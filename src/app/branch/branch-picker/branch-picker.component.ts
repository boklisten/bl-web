import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Branch } from "@wizardcoder/bl-model";
import { BranchStoreService } from "../../branch/branch-store.service";
import { BranchService } from "@wizardcoder/bl-connect";

@Component({
	selector: "app-branch-picker",
	templateUrl: "./branch-picker.component.html",
	styleUrls: ["./branch-picker.component.scss"]
})
export class BranchPickerComponent implements OnInit {
	@Input() onlyBookable: boolean;
	@Output() picked: EventEmitter<Branch>;

	public branches: Branch[];
	public regions: string[];
	public region: string;
	public branch: Branch;
	public wait: boolean;

	constructor(
		private branchService: BranchService,
		private branchStoreService: BranchStoreService
	) {
		this.picked = new EventEmitter<Branch>();
		this.regions = [
			"Bergen",
			"Drammen",
			"Fredrikstad",
			"Lillestrøm",
			"Oslo",
			"Stavanger",
			"Trondheim"
		];
	}

	ngOnInit() {}

	public pick(branch: Branch) {
		this.branch = branch;
		this.picked.emit(branch);
	}

	public selectRegion(region: string) {
		this.region = region;
		this.branch = null;
		this.branches = [];
		if (this.region) {
			this.getBranchesByRegion(this.region);
		}
		this.picked.emit(this.branch);
	}

	public onChangeRegion() {
		this.selectRegion(null);
	}

	public onChangeBranch() {
		this.branch = null;
		this.picked.emit(this.branch);
	}

	getBranchesByRegion(region: string) {
		this.wait = true;
		let bookableQuery = this.onlyBookable ? "&location.bookable=true" : "";
		this.branchService
			.get({
				query:
					"?location.region=" + region.toLowerCase() + bookableQuery
			})
			.then(branches => {
				this.branches = branches;
				this.wait = false;
			})
			.catch(e => {
				console.log("could not get branches");
				this.wait = false;
			});
	}
}
