import { Component, OnInit } from "@angular/core";
import { BranchStoreService } from "../../branch/branch-store.service";
import { BranchService, StorageService } from "@boklisten/bl-connect";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { UrlPathEditService } from "../../bl-common/services/url-path-edit/url-path-edit.service";

@Component({
	selector: "app-fastbuy-select-courses",
	templateUrl: "./fastbuy-select-courses.component.html",
	styleUrls: ["./fastbuy-select-courses.component.scss"],
})
export class FastbuySelectCoursesComponent implements OnInit {
	public courses = [];
	private branchId: string;
	private selectedCourses = {};
	public wait: boolean;

	constructor(
		private branchStoreService: BranchStoreService,
		private branchService: BranchService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private urlPathEditService: UrlPathEditService,
		private storageService: StorageService
	) {}

	private getCategories(): string[] {
		let queryCategories = this.route.snapshot.queryParamMap.getAll(
			"category"
		);

		if (!queryCategories) {
			return [];
		}

		return queryCategories;
	}

	private getBranchId(): string {
		let branchId = this.route.snapshot.queryParamMap.get("branch");
		if (!branchId) {
			try {
				branchId = this.branchStoreService.getBranch().id;
			} catch (e) {
				return null;
			}
		}
		return branchId;
	}

	private async loadCategories() {
		try {
			const branch = await this.branchService.getById(this.branchId, {
				fresh: true,
			});

			try {
				await this.branchStoreService.setBranch(branch);
			} catch (error) {
				// We want to still display the categories, even though we failed to store the branch info locally
				console.warn(error);
			}

			try {
				const categories = await this.branchStoreService.getBranchItemsCategories();
				this.courses = categories.map((category) => ({
					name: category,
				}));

				for (const selectedCategory of this.getCategories()) {
					this.select(selectedCategory);
				}

				if (this.courses.length <= 0) {
					await this.router.navigate(["/i/select"]);
				}
			} catch {
				// if no categories are found
				await this.router.navigate(["/i/select"]);
			}
		} catch (error) {
			console.error(error);
		}
		this.wait = false;
	}

	ngOnInit() {
		this.branchId = this.getBranchId();

		this.wait = true;
		this.loadCategories();
	}

	public isSelected(courseName) {
		return this.selectedCourses[courseName];
	}

	public select(courseName) {
		this.selectedCourses[courseName] = !this.selectedCourses[courseName];
	}

	public haveSelected(): boolean {
		return this.getSelectedCategories().length > 0;
	}

	public goToItemList() {
		this.router
			.navigate([], {
				relativeTo: this.route,

				queryParams: {
					category: this.getSelectedCategories(),
					branch: this.branchId,
				},
			})
			.then(() => {
				this.router.navigate(["/i/select"], {
					queryParams: {
						category: this.getSelectedCategories(),
						branch: this.branchId,
					},
				});
			})
			.catch(() => {});
	}

	private getSelectedCategories() {
		const selectedCategories = [];
		for (const key in this.selectedCourses) {
			if (this.selectedCourses[key]) {
				selectedCategories.push(
					this.urlPathEditService.sentenceToUrlWords(key)
				);
			}
		}
		return selectedCategories;
	}
}
