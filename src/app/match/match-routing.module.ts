import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MatchSelectComponent } from "./match-select/match-select.component";
import { UserGuardService } from "../user/user-guard.service";

const routes: Routes = [
	{
		path: "match/select",
		component: MatchSelectComponent,
		canActivate: [UserGuardService]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MatchRoutingModule {}
