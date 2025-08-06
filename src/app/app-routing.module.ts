import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { LogoutComponent } from "./logout/logout.component";
import { AgreementComponent } from "./agreement/agreement.component";
import { BlNextLinkerComponent } from "./bl-next-linker/bl-next-linker.component";
import { AuthGatewayComponent } from "./auth-gateway/auth-gateway.component";
import { GuardianSignatureComponent } from "./guardian-signature/guardian-signature.component";
import { CartReceiverComponent } from "./cart-receiver/cart-receiver.component";

const routes: Routes = [
	{
		path: "",
		redirectTo: "welcome",
		pathMatch: "full",
	},
	{
		path: "welcome",
		component: WelcomeComponent,
	},
	{
		path: "logout",
		component: LogoutComponent,
	},
	{
		path: "agreement",
		component: AgreementComponent,
	},
	{
		path: "overleveringer",
		component: BlNextLinkerComponent,
	},
	{
		path: "u/edit",
		component: BlNextLinkerComponent,
	},
	{
		path: "cart/receive",
		component: CartReceiverComponent,
	},
	{
		path: "auth",
		children: [
			{
				path: "token",
				component: BlNextLinkerComponent,
			},
			{
				path: "menu",
				component: BlNextLinkerComponent,
			},
			{
				path: "register",
				component: BlNextLinkerComponent,
			},
			{
				path: "login",
				component: BlNextLinkerComponent,
			},
			{
				path: "login/forgot",
				component: BlNextLinkerComponent,
			},
			{
				path: "reset/:id",
				component: BlNextLinkerComponent,
			},
			{
				path: "logout",
				component: BlNextLinkerComponent,
			},
			{
				path: "success",
				component: BlNextLinkerComponent,
			},
			{
				path: "register/detail",
				component: BlNextLinkerComponent,
			},
			{
				path: "social/failure",
				component: BlNextLinkerComponent,
			},
			{
				path: "email/confirm/:id",
				component: BlNextLinkerComponent,
			},
			{
				path: "permission/denied",
				component: BlNextLinkerComponent,
			},
			{
				path: "gateway",
				component: AuthGatewayComponent,
			},
		],
	},
	{
		path: "signering/:customerId",
		component: BlNextLinkerComponent,
	},
	{
		path: "admin/hurtigutdeling",
		component: BlNextLinkerComponent,
	},
	{
		path: "sjekk",
		component: BlNextLinkerComponent,
	},
	{
		path: "admin",
		component: BlNextLinkerComponent,
	},
	{
		path: "items",
		component: BlNextLinkerComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	providers: [
		//{provide: LocationStrategy, useClass: PathLocationStrategy}
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
