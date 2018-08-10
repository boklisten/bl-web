import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginModule} from '@wizardcoder/bl-login';
import {WelcomeComponent} from "./welcome/welcome.component";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";


const routes: Routes = [
	{
		path: '',
		redirectTo: 'welcome',
		pathMatch: 'full'
	},
	{
		path: 'welcome',
		component: WelcomeComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	providers: [
		//{provide: LocationStrategy, useClass: PathLocationStrategy}
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
