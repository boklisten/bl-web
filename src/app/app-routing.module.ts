import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginModule} from 'bl-login';
import {AuthComponent} from "./auth/auth.component";


const routes: Routes = [
	{
		path: 'auth',
		component: AuthComponent,
		loadChildren: () => LoginModule
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		LoginModule
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
