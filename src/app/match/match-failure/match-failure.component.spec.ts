import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MatchFailureComponent } from "./match-failure.component";

describe("MatchFailureComponent", () => {
	let component: MatchFailureComponent;
	let fixture: ComponentFixture<MatchFailureComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MatchFailureComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MatchFailureComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
