import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BranchInfoComponent} from "./branch-info/branch-info.component";
import {BranchComponent} from "./branch.component";
import {BranchSetComponent} from "./branch-set/branch-set.component";

const routes: Routes = [
	{
		path: 'b',
		component: BranchComponent,
		children: [
			{
				path: 'set',
				component: BranchSetComponent
			},
			{
				path: 'info/:id',
				component: BranchInfoComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BranchRoutingModule {
}
