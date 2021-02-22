import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BookingYourBookingsComponent } from "./booking-your-bookings.component";

describe("BookingYourBookingsComponent", () => {
	let component: BookingYourBookingsComponent;
	let fixture: ComponentFixture<BookingYourBookingsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BookingYourBookingsComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BookingYourBookingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
