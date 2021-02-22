import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MatchDeliverComponent } from "./match-deliver.component";

describe("MatchDeliverComponent", () => {
	let component: MatchDeliverComponent;
	let fixture: ComponentFixture<MatchDeliverComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MatchDeliverComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MatchDeliverComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
