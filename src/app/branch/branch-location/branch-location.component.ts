import { Component, OnInit, Input } from "@angular/core";
import { Branch } from "@boklisten/bl-model";
import { BranchService } from "@boklisten/bl-connect";

@Component({
	selector: "app-branch-location",
	templateUrl: "./branch-location.component.html",
	styleUrls: ["./branch-location.component.scss"]
})
export class BranchLocationComponent implements OnInit {
	@Input() branchId: string;

	public branch: Branch;
	public wait: boolean;

	constructor(private branchService: BranchService) {}

	ngOnInit() {
		this.wait = true;
		this.branchService
			.getById(this.branchId)
			.then(branch => {
				this.branch = branch;
				this.wait = false;
			})
			.catch(e => {
				this.wait = false;
			});
	}
}
