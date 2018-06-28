import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {Component, EventEmitter, Injectable, Input, Output} from "@angular/core";
import {Router} from "@angular/router";
import {BranchStoreService} from "../branch/branch-store.service";
import {UserService} from "../user/user.service";
import {NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";

@Injectable()
class RouterStub {
	navigateByUrl(url: any) {

	}
}

@Injectable()
class BranchStoreStubService {
	getBranch() {

	}
}

@Injectable()
class UserStubService {
	loggedIn() {

	}
}

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon: any;
	@Input() size: any;
}


@Component({selector: 'app-header-cart', template: ''})
class HeaderCartStubComponent {
}

@Component({selector: 'app-user-menu', template: ''})
class UserMenuStubComponent {
	@Input() showMenu;
	@Output() showMenuChange = new EventEmitter<boolean>();
}

@Injectable()
class NgbDropdownConfigStubService {
	placement: any;
}


describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				HeaderComponent,
				FaIconStubComponent,
				HeaderCartStubComponent,
				UserMenuStubComponent
			],
			providers: [
				{provide: Router, useValue: new RouterStub()},
				{provide: BranchStoreService, useValue: new BranchStoreStubService()},
				{provide: UserService, useValue: new UserStubService()},
				{provide: NgbDropdownConfig, useClass: NgbDropdownConfigStubService}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
