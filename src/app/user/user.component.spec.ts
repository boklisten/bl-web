import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UserComponent } from "./user.component";
import { Component } from "@angular/core";

@Component({ selector: "router-outlet", template: "" })
class RouterOutletStubComponent {}

describe("UserComponent", () => {
	let component: UserComponent;
	let fixture: ComponentFixture<UserComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserComponent, RouterOutletStubComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
