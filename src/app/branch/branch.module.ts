import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BranchSelectComponent} from "./branch-select/branch-select.component";
import {FormsModule} from "@angular/forms";
import {BranchStoreService} from "./branch-store.service";
import { BranchInfoComponent } from './branch-info/branch-info.component';
import {BranchRoutingModule} from "./branch-routing.module";
import { BranchComponent } from './branch.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { BranchOpeningHoursComponent } from './branch-opening-hours/branch-opening-hours.component';
import {BranchOpeningHoursService} from "./branch-opening-hours/branch-opening-hours.service";
import { BranchContactInfoComponent } from './branch-contact-info/branch-contact-info.component';
import { BranchSetComponent } from './branch-set/branch-set.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		BranchRoutingModule,
		NgbModule
	],
	declarations: [
		BranchSelectComponent,
		BranchInfoComponent,
		BranchComponent,
		BranchOpeningHoursComponent,
		BranchContactInfoComponent,
		BranchSetComponent
	],
	exports: [
		BranchSelectComponent
	],
	providers: [
		BranchStoreService,
		BranchOpeningHoursService
	]
})
export class BranchModule {
}
