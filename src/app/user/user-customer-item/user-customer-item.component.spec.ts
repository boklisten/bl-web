import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserCustomerItemComponent} from './user-customer-item.component';
import {FaIconStubComponent} from "../../../test/stubs/fa-icon.component.stub";
import {BlcDateStubPipe} from "../../../test/stubs/bl-common/blc-date.pipe.stub";
import {BlcPriceStubPipe} from "../../../test/stubs/bl-common/blc-price.pipe.stub";
import {BlcBranchStubPipe} from "../../../test/stubs/bl-common/blc-branch.pipe.stub";
import {BlcCustomerItemDateStubPipe} from "../../../test/stubs/bl-common/blc-customer-item.pipe.stub";
import {RouterTestingModule} from "@angular/router/testing";
import {BlcCustomerItemPriceStubPipe} from "../../../test/stubs/bl-common/blc-customer-item-price.pipe.stub";
import {Injectable} from "@angular/core";
import {BranchService, ItemService} from "@wizardcoder/bl-connect";
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
