import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InfoRoutingModule } from "./info-routing.module";
import { InfoComponent } from "./info.component";
import { InfoAgreementComponent } from "./info-agreement/info-agreement.component";
import { InfoAgreementPrivacyComponent } from "./info-agreement/info-agreement-privacy/info-agreement-privacy.component";
import { InfoAgreementConditionsComponent } from "./info-agreement/info-agreement-conditions/info-agreement-conditions.component";
import { InfoFaqComponent } from "./info-faq/info-faq.component";
import {
	NgbAccordionModule,
	NgbCollapseModule,
} from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BranchModule } from "../branch/branch.module";
import { InfoMenuListComponent } from "./info-menu-list/info-menu-list.component";
import { ContactInfoComponent } from "./contact-info/contact-info.component";
import { InfoAgreementTermsComponent } from "./info-agreement/info-agreement-terms/info-agreement-terms.component";
import { InfoGeneralComponent } from "./info-general/info-general.component";
import { InfoAboutComponent } from "./info-about/info-about.component";
import { InfoForCompaniesComponent } from "./info-for-companies/info-for-companies.component";
import { InfoForPupilsComponent } from "./info-for-pupils/info-for-pupils.component";
import { InfoBuybackComponent } from "./info-buyback/info-buyback.component";
import { BlCommonModule } from "../bl-common/bl-common.module";
import { InfoMatchingComponent } from "./info-matching/info-matching.component";
import { InfoAgreementConditionsOldComponent } from "./info-agreement/info-agreement-conditions/info-agreement-conditions-old/info-agreement-conditions-old.component";
import { InfoCoronaComponent } from "./info-corona/info-corona.component";
import { BlNextLinkerModule } from "../bl-next-linker/bl-next-linker.module";

@NgModule({
	imports: [
		CommonModule,
		InfoRoutingModule,
		NgbAccordionModule,
		NgbCollapseModule,
		FontAwesomeModule,
		BranchModule,
		BlCommonModule,
		BlNextLinkerModule,
	],
	declarations: [
		InfoComponent,
		InfoAgreementComponent,
		InfoAgreementPrivacyComponent,
		InfoFaqComponent,
		InfoMenuListComponent,
		ContactInfoComponent,
		InfoAgreementTermsComponent,
		InfoGeneralComponent,
		InfoAboutComponent,
		InfoForCompaniesComponent,
		InfoForPupilsComponent,
		InfoAgreementConditionsComponent,
		InfoBuybackComponent,
		InfoMatchingComponent,
		InfoAgreementConditionsOldComponent,
		InfoCoronaComponent,
	],
	exports: [
		InfoAgreementPrivacyComponent,
		InfoAgreementTermsComponent,
		InfoAgreementConditionsComponent,
	],
})
export class InfoModule {}
