import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InfoComponent} from "./info.component";
import {InfoAgreementPrivacyComponent} from "./info-agreement/info-agreement-privacy/info-agreement-privacy.component";
import {InfoAgreementRentComponent} from "./info-agreement/info-agreement-rent/info-agreement-rent.component";
import {InfoAgreementTermsComponent} from "./info-agreement/info-agreement-terms/info-agreement-terms.component";

const routes: Routes = [
	{
		path: 'info',
		component: InfoComponent,
	},
	{
		path: 'info/policies/privacy',
		component: InfoAgreementPrivacyComponent
	},
	{
		path: 'info/policies/rent',
		component: InfoAgreementRentComponent
	},
	{
		path: 'info/policies/terms',
		component: InfoAgreementTermsComponent
	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class InfoRoutingModule {
}
