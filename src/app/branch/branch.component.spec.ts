import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BranchComponent } from "./branch.component";
import { Component, Injectable } from "@angular/core";

@Component({ selector: "router-outlet", template: "" })
class RouterOutletStubComponent {}

describe("BranchComponent", () => {
	let component: BranchComponent;
	let fixture: ComponentFixture<BranchComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BranchComponent, RouterOutletStubComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BranchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
