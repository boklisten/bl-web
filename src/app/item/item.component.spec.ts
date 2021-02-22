import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemComponent } from "./item.component";
import { Component } from "@angular/core";

@Component({ selector: "router-outlet", template: "" })
class RouterOutletStubComponent {}

describe("ItemComponent", () => {
	let component: ItemComponent;
	let fixture: ComponentFixture<ItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ItemComponent, RouterOutletStubComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
