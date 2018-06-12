import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserItemComponent} from './user-item.component';
import {Component, Injectable, Input} from "@angular/core";
import {CustomerItemService} from "@wizardcoder/bl-connect";
import {UserService} from "../user.service";


@Injectable()
class CustomerItemStubService {
	getManyByIds() {
		return new Promise((resolve, reject) => {

		});
	}
}

@Injectable()
class UserStubService {
	getUserDetail() {
		return new Promise((resolve, reject) => {

		});
	}
}

@Component({selector: 'app-cart-go-to-bar', template: ''})
class CartGoToBarStubComponent {

}

@Component({selector: 'app-user-customer-item', template: ''})
class UserCustomerItemStubComponent {
	@Input() customerItem;
}

@Component({selector: 'fa-icon', template: ''})
export class FaIconStubComponent {
	@Input() icon: any;
	@Input() size: any;
	@Input() spin: any;
}

describe('UserItemComponent', () => {
	let component: UserItemComponent;
	let fixture: ComponentFixture<UserItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				UserItemComponent,
				UserCustomerItemStubComponent,
				CartGoToBarStubComponent,
				FaIconStubComponent
			],
			providers: [
				{provide: CustomerItemService, useValue: new CustomerItemStubService()},
				{provide: UserService, useValue: new UserStubService()}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
