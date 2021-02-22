import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FastbuyComponent } from "./fastbuy.component";
import { FastbuySelectRegionComponent } from "./fastbuy-select-region/fastbuy-select-region.component";
import { FastbuySelectCoursesComponent } from "./fastbuy-select-courses/fastbuy-select-courses.component";
import { FastbuySelectBranchComponent } from "./fastbuy-select-branch/fastbuy-select-branch.component";

const routes: Routes = [
	{
		path: "fastbuy",
		component: FastbuyComponent,
		children: [
			{ path: "regions", component: FastbuySelectRegionComponent },
			{ path: "branches", component: FastbuySelectBranchComponent },
			{ path: "courses", component: FastbuySelectCoursesComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class FastbuyRoutingModule {}
