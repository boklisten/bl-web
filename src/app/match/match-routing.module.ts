import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MatchSelectComponent } from "./match-select/match-select.component";
import { UserGuardService } from "../user/user-guard.service";
import { MatchInfoNextStepComponent } from "./match-info-next-step/match-info-next-step.component";
import { MatchDeliverComponent } from "./match-deliver/match-deliver.component";

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
		path: "match/deliver",
		component: MatchDeliverComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MatchRoutingModule {}
