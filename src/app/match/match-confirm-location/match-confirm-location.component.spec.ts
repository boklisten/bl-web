import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MatchConfirmLocationComponent } from "./match-confirm-location.component";

describe("MatchConfirmLocationComponent", () => {
	let component: MatchConfirmLocationComponent;
	let fixture: ComponentFixture<MatchConfirmLocationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MatchConfirmLocationComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MatchConfirmLocationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
