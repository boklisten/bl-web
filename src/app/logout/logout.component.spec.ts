import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LogoutComponent } from "./logout.component";
import { Component, Injectable, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({ selector: "fa-icon", template: "" })
class FaIconStubComponent {
	@Input() icon;
	@Input() size;
}

@Injectable()
class RouterStub {}

describe("LogoutComponent", () => {
	let component: LogoutComponent;
	let fixture: ComponentFixture<LogoutComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LogoutComponent, FaIconStubComponent],
			providers: [{ provide: Router, useClass: RouterStub }],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LogoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
