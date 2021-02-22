import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { InfoForCompaniesComponent } from "./info-for-companies.component";

describe("InfoForCompaniesComponent", () => {
	let component: InfoForCompaniesComponent;
	let fixture: ComponentFixture<InfoForCompaniesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [InfoForCompaniesComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InfoForCompaniesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
