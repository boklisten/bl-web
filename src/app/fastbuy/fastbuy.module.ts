import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FastbuyRoutingModule } from "./fastbuy-routing.module";
import { FastbuyComponent } from "./fastbuy.component";
import { FastbuySelectRegionComponent } from "./fastbuy-select-region/fastbuy-select-region.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FastbuySelectCoursesComponent } from "./fastbuy-select-courses/fastbuy-select-courses.component";
import { FastbuySelectBranchComponent } from "./fastbuy-select-branch/fastbuy-select-branch.component";

@NgModule({
	declarations: [
		FastbuyComponent,
		FastbuySelectRegionComponent,
		FastbuySelectCoursesComponent,
		FastbuySelectBranchComponent,
	],
	imports: [CommonModule, FastbuyRoutingModule, FontAwesomeModule],
	exports: [FastbuyComponent],
})
export class FastbuyModule {}
