import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FastbuyComponent } from "./fastbuy.component";

describe("FastbuyComponent", () => {
	let component: FastbuyComponent;
	let fixture: ComponentFixture<FastbuyComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FastbuyComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FastbuyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
