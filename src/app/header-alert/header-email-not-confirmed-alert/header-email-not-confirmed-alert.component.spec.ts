import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderEmailNotConfirmedAlertComponent } from "./header-email-not-confirmed-alert.component";
import { Component, Injectable, Input } from "@angular/core";
import { UserService } from "../../user/user.service";
import { AuthLoginService } from "@boklisten/bl-login";
import { Subject } from "rxjs/internal/Subject";

@Injectable()
class UserStubService {
	onUserDetailChange() {
		return new Subject();
	}

	getUserDetail() {
		return new Promise((resolve, reject) => {});
	}
}

@Component({ selector: "fa-icon", template: "" })
class FaIconStubComponent {
	@Input() icon: any;
}

@Injectable()
class AuthLoginStubService {
	isLoggedIn() {
		return true;
	}

	onLogin() {
		return new Subject();
	}

	onLogout() {
		return new Subject();
	}
}

describe("HeaderEmailNotConfirmedAlertComponent", () => {
	let component: HeaderEmailNotConfirmedAlertComponent;
	let fixture: ComponentFixture<HeaderEmailNotConfirmedAlertComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				HeaderEmailNotConfirmedAlertComponent,
				FaIconStubComponent,
			],
			providers: [
				{ provide: UserService, useClass: UserStubService },
				{ provide: AuthLoginService, useClass: AuthLoginStubService },
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(
			HeaderEmailNotConfirmedAlertComponent
		);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
