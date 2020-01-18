import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MatchSelectComponent } from "./match-select/match-select.component";
import { UserGuardService } from "../user/user-guard.service";
import { MatchInfoNextStepComponent } from "./match-info-next-step/match-info-next-step.component";
import { MatchDeliverComponent } from "./match-deliver/match-deliver.component";
import { MatchDetailComponent } from "./match-detail/match-detail.component";
import { MatchRecieveComponent } from "./match-recieve/match-recieve.component";
import { MatchFailureComponent } from "./match-failure/match-failure.component";

const routes: Routes = [
	{
		path: "m",
		pathMatch: "full",
		redirectTo: "match/select"
	},
	{
		path: "match",
		pathMatch: "full",
		redirectTo: "match/select"
	},
	{
		path: "match/select",
		component: MatchSelectComponent,
		canActivate: [UserGuardService]
	},
	{
		path: "match/next-steps",
		component: MatchInfoNextStepComponent
	},
	{
		path: "match/failure",
		component: MatchFailureComponent
	},
	{
		path: "match/:id",
		component: MatchDetailComponent,
		children: [
			{
				path: "d",
				component: MatchDeliverComponent
			},
			{
				path: "r",
				component: MatchRecieveComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MatchRoutingModule {}
