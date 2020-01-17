import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatchRoutingModule } from "./match-routing.module";
import { MatchSelectComponent } from "./match-select/match-select.component";
import { BlCommonModule } from "../bl-common/bl-common.module";
import { MatchSelectItemComponent } from "./match-select/match-select-item/match-select-item.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatchInfoNextStepComponent } from "./match-info-next-step/match-info-next-step.component";
import { MatchDeliverComponent } from "./match-deliver/match-deliver.component";
import { MatchProfileCardComponent } from "./match-profile-card/match-profile-card.component";
import { MatchLocationCardComponent } from "./match-location-card/match-location-card.component";
import { MatchDetailComponent } from "./match-detail/match-detail.component";
import { MatchRecieveComponent } from "./match-recieve/match-recieve.component";
import { MatchFailureComponent } from "./match-failure/match-failure.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
	declarations: [
		MatchSelectComponent,
		MatchSelectItemComponent,
		MatchInfoNextStepComponent,
		MatchDeliverComponent,
		MatchProfileCardComponent,
		MatchLocationCardComponent,
		MatchDetailComponent,
		MatchRecieveComponent,
		MatchFailureComponent
	],
	imports: [
		CommonModule,
		MatchRoutingModule,
		BlCommonModule,
		FontAwesomeModule,
		NgbModule
	]
})
export class MatchModule {}
