import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CartComponent} from "./cart.component";
import {BranchGuardService} from "../branch/branch-guard-service/branch-guard.service";

const routes: Routes = [
	{
		path: 'cart',
		component: CartComponent,
		canActivate: [BranchGuardService]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CartRoutingModule {
}
