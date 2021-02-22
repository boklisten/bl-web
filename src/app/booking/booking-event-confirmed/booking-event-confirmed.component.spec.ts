import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BookingEventConfirmedComponent } from "./booking-event-confirmed.component";

describe("BookingEventConfirmedComponent", () => {
	let component: BookingEventConfirmedComponent;
	let fixture: ComponentFixture<BookingEventConfirmedComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BookingEventConfirmedComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BookingEventConfirmedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
