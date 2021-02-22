import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MatchInfoNextStepComponent } from "./match-info-next-step.component";

describe("MatchInfoNextStepComponent", () => {
	let component: MatchInfoNextStepComponent;
	let fixture: ComponentFixture<MatchInfoNextStepComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MatchInfoNextStepComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MatchInfoNextStepComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
