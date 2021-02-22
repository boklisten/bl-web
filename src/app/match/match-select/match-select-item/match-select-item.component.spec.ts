import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MatchSelectItemComponent } from "./match-select-item.component";

describe("MatchSelectItemComponent", () => {
	let component: MatchSelectItemComponent;
	let fixture: ComponentFixture<MatchSelectItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MatchSelectItemComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MatchSelectItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
