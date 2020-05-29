import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookingSelectComponent } from "./booking-select/booking-select.component";
import { BookingConfirmComponent } from "./booking-confirm/booking-confirm.component";
import { BookingEventConfirmedComponent } from "./booking-event-confirmed/booking-event-confirmed.component";
import { UserGuardService } from "../user/user-guard.service";
import { BookingYourBookingsComponent } from "./booking-your-bookings/booking-your-bookings.component";
import { BookingCancelComponent } from "./booking-cancel/booking-cancel.component";

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
				path: ":id",
				children: [
					{
						path: "confirm",
						component: BookingConfirmComponent,
						canActivate: [UserGuardService]
					},
					{
						path: "confirmed",
						component: BookingEventConfirmedComponent
					},
					{
						path: "cancel",
						component: BookingCancelComponent
					}
				]
			},
			{
				path: "customer/list",
				component: BookingYourBookingsComponent,
				canActivate: [UserGuardService]
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BookingRoutingModule {}
