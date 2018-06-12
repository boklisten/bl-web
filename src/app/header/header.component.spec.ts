import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {Component, Injectable, Input} from "@angular/core";
import {Router} from "@angular/router";
import {BranchStoreService} from "../branch/branch-store.service";
import {UserService} from "../user/user.service";

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
}


@Component({selector: 'app-header-cart', template: ''})
class HeaderCartStubComponent {
}


describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				HeaderComponent,
				FaIconStubComponent,
				HeaderCartStubComponent
			],
			providers: [
				{provide: Router, useValue: new RouterStub()},
				{provide: BranchStoreService, useValue: new BranchStoreStubService()},
				{provide: UserService, useValue: new UserStubService()}
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
