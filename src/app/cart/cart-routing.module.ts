import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CartComponent } from "./cart.component";
import { BranchGuardService } from "../branch/branch-guard-service/branch-guard.service";
import { CartConfirmComponent } from "./cart-confirm/cart-confirm.component";
import { UserGuardService } from "../user/user-guard.service";
import { CartOrderCheckoutComponent } from "./cart-order-checkout/cart-order-checkout.component";

const routes: Routes = [
	{
		path: "cart",
		component: CartComponent,
		canActivate: [BranchGuardService]
	},
	{
		path: "cart/checkout",
		component: CartOrderCheckoutComponent,
		canActivate: [BranchGuardService]
	},
	{
		path: "cart/confirm",
		component: CartConfirmComponent,
		canActivate: [BranchGuardService]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CartRoutingModule {}
