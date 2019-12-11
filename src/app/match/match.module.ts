import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatchRoutingModule } from "./match-routing.module";
import { MatchSelectComponent } from "./match-select/match-select.component";
import { BlCommonModule } from "../bl-common/bl-common.module";
import { MatchSelectItemComponent } from "./match-select/match-select-item/match-select-item.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatchInfoNextStepComponent } from './match-info-next-step/match-info-next-step.component';
import { MatchDeliverComponent } from './match-deliver/match-deliver.component';
import { MatchProfileCardComponent } from './match-profile-card/match-profile-card.component';
import { MatchLocationCardComponent } from './match-location-card/match-location-card.component';

@NgModule({
	declarations: [MatchSelectComponent, MatchSelectItemComponent, MatchInfoNextStepComponent, MatchDeliverComponent, MatchProfileCardComponent, MatchLocationCardComponent],
	imports: [
		CommonModule,
		MatchRoutingModule,
		BlCommonModule,
		FontAwesomeModule
	]
})
export class MatchModule {}
