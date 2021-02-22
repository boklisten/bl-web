import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MatchRecieveComponent } from "./match-recieve.component";

describe("MatchRecieveComponent", () => {
	let component: MatchRecieveComponent;
	let fixture: ComponentFixture<MatchRecieveComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MatchRecieveComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MatchRecieveComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
