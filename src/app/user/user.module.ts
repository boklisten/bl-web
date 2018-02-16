import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {UserRoutingModule} from "./user-routing.module";
import {UserService} from "./user.service";
import {BranchSelectComponent} from "../branch/branch-select/branch-select.component";
import {BranchModule} from "../branch/branch.module";

@NgModule({
	imports: [
		CommonModule,
		UserRoutingModule,
		BranchModule
	],
	declarations: [
		HomeComponent
	],
	providers: [
		UserService
	]
})
export class UserModule {
}
