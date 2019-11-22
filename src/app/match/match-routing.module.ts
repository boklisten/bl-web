import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MatchSelectComponent } from "./match-select/match-select.component";
import { UserGuardService } from "../user/user-guard.service";
import { MatchInfoNextStepComponent } from "./match-info-next-step/match-info-next-step.component";

const routes: Routes = [
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
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MatchRoutingModule {}
