import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookingSelectComponent } from "./booking-select/booking-select.component";

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
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BookingRoutingModule {}
