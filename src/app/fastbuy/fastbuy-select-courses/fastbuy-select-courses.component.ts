import { Component, OnInit } from "@angular/core";
import { BranchStoreService } from "../../branch/branch-store.service";
import { BranchService, StorageService } from "@wizardcoder/bl-connect";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { UrlPathEditService } from "../../bl-common/services/url-path-edit/url-path-edit.service";

@Component({
	selector: "app-fastbuy-select-courses",
	templateUrl: "./fastbuy-select-courses.component.html",
	styleUrls: ["./fastbuy-select-courses.component.scss"]
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

	ngOnInit() {
		this.branchId = this.getBranchId();
		let queryCategories = this.getCategories();

		const courseNames = [];

		this.wait = true;
		this.branchService
			.getById(this.branchId, { fresh: true })
			.then(branch => {
				this.branchStoreService
					.setBranch(branch)
					.then(() => {
						this.branchStoreService
							.getBranchItemsCategories()
							.then(categories => {
								for (const category of categories) {
									courseNames.push({ name: category });
								}
								this.courses = courseNames;

								for (const cat of queryCategories) {
									this.select(cat);
								}

								this.wait = false;
								if (this.courses.length <= 0) {
									this.router.navigate(["/i/select"]);
								}
							})
							.catch(() => {
								// if no categories are found
								this.router.navigate(["/i/select"]);
							});
					})
					.catch(() => {
						this.wait = false;
					});
			})
			.catch(() => {
				this.wait = false;
			});
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
					branch: this.branchId
				}
			})
			.then(() => {
				this.router.navigate(["/i/select"], {
					queryParams: {
						category: this.getSelectedCategories(),
						branch: this.branchId
					}
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
