import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InfoRoutingModule} from './info-routing.module';
import {InfoComponent} from "./info.component";
import { InfoAgreementComponent } from './info-agreement/info-agreement.component';
import { InfoAgreementPrivacyComponent } from './info-agreement/info-agreement-privacy/info-agreement-privacy.component';
import { InfoAgreementRentComponent } from './info-agreement/info-agreement-rent/info-agreement-rent.component';

@NgModule({
	imports: [
		CommonModule,
		InfoRoutingModule
	],
	declarations: [
		InfoComponent,
		InfoAgreementComponent,
		InfoAgreementPrivacyComponent,
		InfoAgreementRentComponent
	]
})
export class InfoModule {
}
