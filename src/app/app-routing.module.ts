import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginModule } from "@boklisten/bl-login";
import { WelcomeComponent } from "./welcome/welcome.component";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { LogoutComponent } from "./logout/logout.component";
import { AgreementComponent } from "./agreement/agreement.component";
import { PeerToPeerLinkerComponent } from "./peer-to-peer-linker/peer-to-peer-linker.component";
import { UserGuardService } from "./user/user-guard.service";

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
		canActivate: [UserGuardService],
		component: PeerToPeerLinkerComponent,
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
