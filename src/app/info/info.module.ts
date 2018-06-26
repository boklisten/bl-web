import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InfoRoutingModule} from './info-routing.module';
import {InfoComponent} from "./info.component";
import { InfoAgreementComponent } from './info-agreement/info-agreement.component';
import { InfoAgreementPrivacyComponent } from './info-agreement/info-agreement-privacy/info-agreement-privacy.component';
import { InfoAgreementRentComponent } from './info-agreement/info-agreement-rent/info-agreement-rent.component';
import { InfoFaqComponent } from './info-faq/info-faq.component';
import {NgbAccordionModule, NgbTabsetModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BranchModule} from "../branch/branch.module";
import { InfoMenuListComponent } from './info-menu-list/info-menu-list.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { InfoAgreementTermsComponent } from './info-agreement/info-agreement-terms/info-agreement-terms.component';

@NgModule({
	imports: [
		CommonModule,
		InfoRoutingModule,
		NgbAccordionModule,
		NgbTabsetModule,
		FontAwesomeModule,
		BranchModule
	],
	declarations: [
		InfoComponent,
		InfoAgreementComponent,
		InfoAgreementPrivacyComponent,
		InfoAgreementRentComponent,
		InfoFaqComponent,
		InfoMenuListComponent,
		ContactInfoComponent,
		InfoAgreementTermsComponent
	]
})
export class InfoModule {
}
