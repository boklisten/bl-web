import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BlNextLinkerComponent } from "./bl-next-linker.component";
import { BlNextLinkerService } from "./bl-next-linker.service";
import { BlCommonModule } from "../bl-common/bl-common.module";

@NgModule({
	declarations: [BlNextLinkerComponent],
	providers: [BlNextLinkerService],
	imports: [CommonModule, BlCommonModule],
	exports: [BlNextLinkerComponent],
})
export class BlNextLinkerModule {}
