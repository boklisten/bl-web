import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { InfoBuybackComponent } from "./info-buyback.component";

describe("InfoBuybackComponent", () => {
	let component: InfoBuybackComponent;
	let fixture: ComponentFixture<InfoBuybackComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [InfoBuybackComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InfoBuybackComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
