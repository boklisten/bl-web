import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderAlertComponent } from "./header-alert.component";
import { HeaderUserDetailAlertComponent } from "./header-user-detail-alert/header-user-detail-alert.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HeaderEmailNotConfirmedAlertComponent } from "./header-email-not-confirmed-alert/header-email-not-confirmed-alert.component";

@NgModule({
	imports: [CommonModule, FontAwesomeModule],
	declarations: [
		HeaderAlertComponent,
		HeaderUserDetailAlertComponent,
		HeaderEmailNotConfirmedAlertComponent,
	],
	exports: [HeaderAlertComponent],
})
export class HeaderAlertModule {}
