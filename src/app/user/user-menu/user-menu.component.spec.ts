import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UserMenuComponent } from "./user-menu.component";
import { Component, Injectable, Input } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../user.service";

@Injectable()
class RouterStubService {}

@Injectable()
class UserStubService {}

@Component({ selector: "fa-icon", template: "" })
class FaIconStubComponent {
	@Input() icon: any;
}

describe("UserMenuComponent", () => {
	let component: UserMenuComponent;
	let fixture: ComponentFixture<UserMenuComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserMenuComponent, FaIconStubComponent],
			providers: [
				{ provide: Router, useClass: RouterStubService },
				{ provide: UserService, useClass: UserStubService },
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserMenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
