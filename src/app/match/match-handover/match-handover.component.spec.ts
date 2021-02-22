import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MatchHandoverComponent } from "./match-handover.component";

describe("MatchHandoverComponent", () => {
	let component: MatchHandoverComponent;
	let fixture: ComponentFixture<MatchHandoverComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MatchHandoverComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MatchHandoverComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
