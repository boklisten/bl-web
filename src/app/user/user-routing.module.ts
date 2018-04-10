import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from "./user.component";
import {HomeComponent} from "./home/home.component";
import {OrderComponent} from "./order/order.component";
import {UserItemComponent} from "./user-item/user-item.component";
import {UserGuardService} from "./user-guard.service";

const routes: Routes = [
	{
		path: 'u',
		component: UserComponent,
		canActivate: [UserGuardService],
		children: [
			{
				path: 'home',
				component: HomeComponent
			},
			{
				path: 'order',
				component: OrderComponent
			},
			{
				path: 'items',
				component: UserItemComponent
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
