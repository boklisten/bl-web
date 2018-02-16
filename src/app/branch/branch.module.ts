import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BranchSelectComponent} from "./branch-select/branch-select.component";
import {FormsModule} from "@angular/forms";
import {BranchStoreService} from "./branch-store.service";

@NgModule({
	imports: [
		CommonModule,
		FormsModule
	],
	declarations: [
		BranchSelectComponent
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
