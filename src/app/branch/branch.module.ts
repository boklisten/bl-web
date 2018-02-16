import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BranchSelectComponent} from "./branch-select/branch-select.component";
import {FormsModule} from "@angular/forms";
import {BranchStoreService} from "./branch-store.service";
import { BranchInfoComponent } from './branch-info/branch-info.component';
import {BranchRoutingModule} from "./branch-routing.module";
import { BranchComponent } from './branch.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

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
		BranchComponent
	],
	exports: [
		BranchSelectComponent
	],
	providers: [
		BranchStoreService
	]
})
export class BranchModule {
}
