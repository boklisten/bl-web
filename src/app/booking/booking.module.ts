import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BookingRoutingModule } from "./booking-routing.module";
import { BookingComponent } from "./booking.component";
import { BookingSelectComponent } from "./booking-select/booking-select.component";
import { BlCommonModule } from "../bl-common/bl-common.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BookingConfirmComponent } from "./booking-confirm/booking-confirm.component";
import { DateModule } from "../date/date.module";
import { BookingEventConfirmedComponent } from './booking-event-confirmed/booking-event-confirmed.component';

@NgModule({
	declarations: [
		BookingComponent,
		BookingSelectComponent,
		BookingConfirmComponent,
		BookingEventConfirmedComponent
	],
	imports: [
		CommonModule,
		BookingRoutingModule,
		BlCommonModule,
		FontAwesomeModule,
		DateModule
	]
})
export class BookingModule {}
