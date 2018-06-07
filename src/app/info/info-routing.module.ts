import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InfoComponent} from "./info.component";
import {InfoAgreementComponent} from "./info-agreement/info-agreement.component";
import {InfoAgreementPrivacyComponent} from "./info-agreement/info-agreement-privacy/info-agreement-privacy.component";
import {InfoAgreementRentComponent} from "./info-agreement/info-agreement-rent/info-agreement-rent.component";
import {InfoFaqComponent} from "./info-faq/info-faq.component";

const routes: Routes = [
	{
		path: 'info',
		component: InfoComponent,
		children: [
			{
				path: 'agreement',
				component: InfoAgreementComponent,
				children: [
					{
						path: 'privacy',
						component: InfoAgreementPrivacyComponent
					},
					{
						path: 'rent',
						component: InfoAgreementRentComponent
					}
				]
			},
			{
				path: 'faq',
				component: InfoFaqComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class InfoRoutingModule {
}
