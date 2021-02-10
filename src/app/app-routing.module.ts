import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginModule} from '@boklisten/bl-login';
import {WelcomeComponent} from "./welcome/welcome.component";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
import {LogoutComponent} from "./logout/logout.component";


const routes: Routes = [
	{
		path: '',
		redirectTo: 'welcome',
		pathMatch: 'full'
	},
	{
		path: 'welcome',
		component: WelcomeComponent
	},
	{
		path: 'logout',
		component: LogoutComponent
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
