import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from "./user.component";
import {HomeComponent} from "./home/home.component";
import {OrderComponent} from "./order/order.component";

const routes: Routes = [
	{
		path: 'u',
		component: UserComponent,
		children: [
			{
				path: 'home',
				component: HomeComponent
			},
			{
				path: 'order',
				component: OrderComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserRoutingModule {
}
