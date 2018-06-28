import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from "./user.component";
import {OrderComponent} from "./order/order.component";
import {UserItemComponent} from "./user-item/user-item.component";
import {UserGuardService} from "./user-guard.service";
import {BranchGuardService} from "../branch/branch-guard-service/branch-guard.service";
import {UserEditComponent} from "./user-edit/user-edit.component";

const routes: Routes = [
	{
		path: 'u',
		component: UserComponent,
		canActivate: [UserGuardService],
		children: [
			{
				path: 'order',
				component: OrderComponent
			},
			{
				path: 'items',
				canActivate: [BranchGuardService],
				component: UserItemComponent
			},
			{
				path: 'edit',
				component: UserEditComponent
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
