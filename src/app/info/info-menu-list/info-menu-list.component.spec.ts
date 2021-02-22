import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { InfoMenuListComponent } from "./info-menu-list.component";

describe("InfoMenuListComponent", () => {
	let component: InfoMenuListComponent;
	let fixture: ComponentFixture<InfoMenuListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [InfoMenuListComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InfoMenuListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
