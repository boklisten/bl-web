import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookingSelectComponent } from "./booking-select/booking-select.component";
import { BookingConfirmComponent } from "./booking-confirm/booking-confirm.component";
import { BookingEventConfirmedComponent } from "./booking-event-confirmed/booking-event-confirmed.component";
import { BookingYourBookingsComponent } from "./booking-your-bookings/booking-your-bookings.component";

const routes: Routes = [
	{
		path: "bookings",
		children: [
			{
				path: "",
				pathMatch: "full",
				redirectTo: "select"
			},
			{
				path: "select",
				component: BookingSelectComponent
			},
			{
				path: ":id/confirm",
				component: BookingConfirmComponent
			},
			{
				path: ":id/confirmed",
				component: BookingEventConfirmedComponent
			},
			{
				path: "customer/list",
				component: BookingYourBookingsComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BookingRoutingModule {}
