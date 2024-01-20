import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NewsBannerComponent } from "./news-banner.component";

@NgModule({
	imports: [CommonModule],
	declarations: [NewsBannerComponent],
	exports: [NewsBannerComponent],
})
export class NewsBannerModule {}
