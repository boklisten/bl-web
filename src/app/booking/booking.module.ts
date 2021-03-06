import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BookingRoutingModule } from "./booking-routing.module";
import { BookingComponent } from "./booking.component";
import { BookingSelectComponent } from "./booking-select/booking-select.component";
import { BlCommonModule } from "../bl-common/bl-common.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BookingConfirmComponent } from "./booking-confirm/booking-confirm.component";
import { DateModule } from "../date/date.module";
import { BookingEventConfirmedComponent } from "./booking-event-confirmed/booking-event-confirmed.component";
import { BookingYourBookingsComponent } from "./booking-your-bookings/booking-your-bookings.component";
import { BranchModule } from "../branch/branch.module";
import { BookingDisplayComponent } from "./booking-display/booking-display.component";
import { BookingCancelComponent } from "./booking-cancel/booking-cancel.component";
import { BookingTimePickerComponent } from "./booking-time-picker/booking-time-picker.component";

@NgModule({
	declarations: [
		BookingComponent,
		BookingSelectComponent,
		BookingConfirmComponent,
		BookingEventConfirmedComponent,
		BookingYourBookingsComponent,
		BookingDisplayComponent,
		BookingCancelComponent,
		BookingTimePickerComponent,
	],
	imports: [
		CommonModule,
		BookingRoutingModule,
		BlCommonModule,
		FontAwesomeModule,
		DateModule,
		BranchModule,
	],
})
export class BookingModule {}
