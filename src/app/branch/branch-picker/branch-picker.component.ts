import {
	Component,
	OnInit,
	Input,
	Output,
	SimpleChanges,
	EventEmitter,
	OnChanges
} from "@angular/core";
import { Branch } from "@wizardcoder/bl-model";
import { BranchStoreService } from "../../branch/branch-store.service";
import { BranchService } from "@wizardcoder/bl-connect";

@Component({
	selector: "app-branch-picker",
	templateUrl: "./branch-picker.component.html",
	styleUrls: ["./branch-picker.component.scss"]
})
export class BranchPickerComponent implements OnInit, OnChanges {
	@Input() onlyBookable: boolean;
	@Input() prePicked: string;
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
			//"Bergen",
			//"Drammen",
			//"Fredrikstad",
			//"Lillestrøm",
			//"Oslo",
			//"Stavanger",
			"Trondheim"
		];
	}

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges) {
		if (changes["prePicked"]) {
			let id = changes["prePicked"]["currentValue"];
			if (id) {
				this.branchService
					.getById(id)
					.then(branch => {
						let region = branch.location.region;
						region =
							region.charAt(0).toUpperCase() + region.slice(1);
						this.selectRegion(region);
						this.pick(branch);
					})
					.catch(e => {});
			}
		}
	}

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
