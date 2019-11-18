import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatchRoutingModule } from "./match-routing.module";
import { MatchSelectComponent } from "./match-select/match-select.component";
import { BlCommonModule } from "../bl-common/bl-common.module";
import { MatchSelectItemComponent } from "./match-select/match-select-item/match-select-item.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
	declarations: [MatchSelectComponent, MatchSelectItemComponent],
	imports: [
		CommonModule,
		MatchRoutingModule,
		BlCommonModule,
		FontAwesomeModule
	]
})
export class MatchModule {}
