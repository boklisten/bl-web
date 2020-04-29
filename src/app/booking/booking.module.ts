import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { BookingSelectComponent } from './booking-select/booking-select.component';

@NgModule({
  declarations: [BookingComponent, BookingSelectComponent],
  imports: [
    CommonModule,
    BookingRoutingModule
  ]
})
export class BookingModule { }
