import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginModule} from 'bl-login';
import {WelcomeComponent} from "./welcome/welcome.component";


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
		RouterModule.forRoot(routes),
		LoginModule.withConfig({successPath: '/u/home'})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
