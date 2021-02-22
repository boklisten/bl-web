import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MatchSuccessComponent } from "./match-success.component";

describe("MatchSuccessComponent", () => {
	let component: MatchSuccessComponent;
	let fixture: ComponentFixture<MatchSuccessComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MatchSuccessComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MatchSuccessComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
