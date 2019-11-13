import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatchRoutingModule } from "./match-routing.module";
import { MatchSelectComponent } from "./match-select/match-select.component";
import { BlCommonModule } from "../bl-common/bl-common.module";

@NgModule({
	declarations: [MatchSelectComponent],
	imports: [CommonModule, MatchRoutingModule, BlCommonModule]
})
export class MatchModule {}
