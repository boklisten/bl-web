import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderAlertComponent} from './header-alert.component';
import {HeaderUserDetailAlertComponent} from "./header-user-detail-alert/header-user-detail-alert.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {LoginModule} from "@wizardcoder/bl-login";

@NgModule({
	imports: [
		CommonModule,
		FontAwesomeModule,
		LoginModule
	],
	declarations: [
		HeaderAlertComponent,
		HeaderUserDetailAlertComponent
	],
	exports: [
		HeaderAlertComponent
	]
})
export class HeaderAlertModule {
}
