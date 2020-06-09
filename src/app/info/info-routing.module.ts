import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InfoComponent } from "./info.component";
import { InfoAgreementPrivacyComponent } from "./info-agreement/info-agreement-privacy/info-agreement-privacy.component";
import { InfoAgreementTermsComponent } from "./info-agreement/info-agreement-terms/info-agreement-terms.component";
import { InfoAgreementConditionsComponent } from "./info-agreement/info-agreement-conditions/info-agreement-conditions.component";
import { InfoAgreementConditionsOldComponent } from "./info-agreement/info-agreement-conditions/info-agreement-conditions-old/info-agreement-conditions-old.component";
import { InfoAboutComponent } from "./info-about/info-about.component";
import { InfoFaqComponent } from "./info-faq/info-faq.component";
import { InfoForPupilsComponent } from "./info-for-pupils/info-for-pupils.component";
import { BranchInfoComponent } from "../branch/branch-info/branch-info.component";
import { InfoForCompaniesComponent } from "./info-for-companies/info-for-companies.component";
import { InfoGeneralComponent } from "./info-general/info-general.component";
import { ContactInfoComponent } from "./contact-info/contact-info.component";
import { InfoAgreementComponent } from "./info-agreement/info-agreement.component";
import { InfoBuybackComponent } from "./info-buyback/info-buyback.component";
import { InfoMatchingComponent } from "./info-matching/info-matching.component";
import { InfoCoronaComponent } from "./info-corona/info-corona.component";

const routes: Routes = [
	{
		path: "info",
		component: InfoComponent,
		children: [
			{ path: "", redirectTo: "general", pathMatch: "full" },
			{ path: "general", component: InfoGeneralComponent },
			{ path: "faq", component: InfoFaqComponent },
			{ path: "pupils", component: InfoForPupilsComponent },
			{ path: "branch", component: BranchInfoComponent },
			{ path: "branch/:id", component: BranchInfoComponent },
			{ path: "about", component: InfoAboutComponent },
			{ path: "companies", component: InfoForCompaniesComponent },
			{ path: "buyback", component: InfoBuybackComponent },
			{ path: "matching", component: InfoMatchingComponent },
			{ path: "contact", component: ContactInfoComponent },
			{ path: "covid-19", component: InfoCoronaComponent },
			{
				path: "policies",
				component: InfoAgreementComponent,
				children: [
					{
						path: "",
						redirectTo: "conditions",
						pathMatch: "full"
					},
					{
						path: "privacy",
						component: InfoAgreementPrivacyComponent
					},
					{
						path: "conditions",
						component: InfoAgreementConditionsOldComponent
					},
					{
						path: "terms",
						component: InfoAgreementTermsComponent
					}
				]
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class InfoRoutingModule {}
