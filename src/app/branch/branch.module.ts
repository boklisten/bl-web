import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BranchSelectComponent} from "./branch-select/branch-select.component";
import {FormsModule} from "@angular/forms";

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
	]
})
export class BranchModule {
}
