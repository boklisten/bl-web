import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ItemComponent} from "./item.component";
import {ItemSelectComponent} from "./item-select/item-select.component";
import {ItemInfoComponent} from "./item-info/item-info.component";
import {BranchGuardService} from "../branch/branch-guard-service/branch-guard.service";

const routes: Routes = [
	{
		path: 'i',
		component: ItemComponent,
		canActivate: [BranchGuardService],
		children: [
			{
				path: 'select',
				component: ItemSelectComponent
			},
			{
				path: ':id',
				component: ItemInfoComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ItemRoutingModule {
}
