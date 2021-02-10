import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserCustomerItemComponent} from './user-customer-item.component';
import {RouterTestingModule} from "@angular/router/testing";
import {Component, Injectable, Input, Pipe} from "@angular/core";
import {BranchService, ItemService} from "@boklisten/bl-connect";
import {Router} from "@angular/router";
import {CartService} from "../../cart/cart.service";
import {DateService} from "../../date/date.service";
import {BranchStoreService} from "../../branch/branch-store.service";
import {UserCustomerItemService} from "./user-customer-item.service";

@Injectable()
class ItemStubService {

}

@Injectable()
class RouterStub {

}

@Injectable()
class BranchStubService {

}

@Injectable()
class CartStubService {

}

@Injectable()
class DateStubService {

}

@Injectable()
class BranchStoreStubService {

}

@Injectable()
class UserCustomerItemStubService {

}

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon: any;
}

@Pipe({name: 'blcDate'})
class BlcDateStubPipe {

}

@Pipe({name: 'blcPrice'})
class BlcPriceStubPipe {

}

@Pipe({name: 'blcBranch'})
class BlcBranchStubPipe {

}


@Pipe({name: 'blcCustomerItemDate'})
class BlcCustomerItemDateStubPipe {

}

@Pipe({name: 'blcCustomerItemPrice'})
class BlcCustomerItemPriceStubPipe {

}






describe('UserCustomerItemComponent', () => {
	let component: UserCustomerItemComponent;
	let fixture: ComponentFixture<UserCustomerItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				UserCustomerItemComponent,
				FaIconStubComponent,
				BlcDateStubPipe,
				BlcPriceStubPipe,
				BlcBranchStubPipe,
				BlcCustomerItemDateStubPipe,
				BlcCustomerItemPriceStubPipe
			],
			imports: [
				RouterTestingModule
			],
			providers: [
				{provide: ItemService, useValue: new ItemStubService()},
				{provide: Router, useValue: RouterStub},
				{provide: BranchService, useValue: new BranchStubService()},
				{provide: CartService, useValue: new CartStubService()},
				{provide: DateService, useValue: new DateStubService()},
				{provide: BranchStoreService, useValue: new BranchStubService()},
				{provide: UserCustomerItemService, useValue: new UserCustomerItemStubService()}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserCustomerItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
