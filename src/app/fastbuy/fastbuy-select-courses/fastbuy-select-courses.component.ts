import { Component, OnInit } from "@angular/core";
import { BranchStoreService } from "../../branch/branch-store.service";
import { BranchService } from "@wizardcoder/bl-connect";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "app-fastbuy-select-courses",
	templateUrl: "./fastbuy-select-courses.component.html",
	styleUrls: ["./fastbuy-select-courses.component.scss"]
})
export class FastbuySelectCoursesComponent implements OnInit {
	public courses = [];
	private branchId: string;
	private selectedCourses = {};

	constructor(
		private branchStoreService: BranchStoreService,
		private branchService: BranchService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.branchId = this.route.snapshot.queryParamMap.get("branch");
		const courseNames = [];

		this.branchService
			.getById(this.branchId)
			.then(branch => {
				this.branchStoreService.setCurrentBranch(branch);
				this.branchStoreService
					.getBranchItemsCategories()
					.then(categories => {
						for (const category of categories) {
							courseNames.push({ name: category });
						}
						this.courses = courseNames;
					});
			})
			.catch(() => {});
	}

	public isSelected(courseName) {
		return this.selectedCourses[courseName];
	}

	public select(courseName) {
		this.selectedCourses[courseName] = !this.selectedCourses[courseName];
	}

	public goToItemList() {
		this.router.navigate(["/i/select"], {
			queryParams: { category: this.getSelectedCategories() }
		});
	}

	private getSelectedCategories() {
		const selectedCategories = [];
		for (const key in this.selectedCourses) {
			if (this.selectedCourses[key]) {
				selectedCategories.push(key);
			}
		}
		return selectedCategories;
	}
}
