import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemTypeSelectComponent} from './item-type-select.component';
import {Component, Injectable, Input, Pipe} from "@angular/core";
import {DateService} from "../../date/date.service";
import {CartService} from "../../cart/cart.service";
import {PriceService} from "../../price/price.service";
import {BranchStoreService} from "../../branch/branch-store.service";
import {FormsModule} from "@angular/forms";
import {UserCustomerItemService} from "../../user/user-customer-item/user-customer-item.service";

@Injectable()
class DateStubService {

}

@Injectable()
class CartStubService {

}

@Injectable()
class PriceStubService {

}

@Injectable()
class BranchStoreStubService {
	getBranch() {
		return new Promise((resolve, reject) => {

		});
	}
}

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon;
}

@Pipe({name: 'blcDate'})
class BlcDateStubPipe {

}

@Injectable()
class UserCustomerItemStubService {

}

describe('ItemTypeSelectComponent', () => {
	let component: ItemTypeSelectComponent;
	let fixture: ComponentFixture<ItemTypeSelectComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				ItemTypeSelectComponent,
				FaIconStubComponent,
				BlcDateStubPipe
			],
			providers: [
				{provide: DateService, useValue: new DateStubService()},
				{provide: CartService, useValue: new CartStubService()},
				{provide: PriceService, useValue: new PriceStubService()},
				{provide: BranchStoreService, useValue: new BranchStoreStubService()},
				{provide: UserCustomerItemService, useClass: UserCustomerItemStubService}
			],
			imports: [
				FormsModule
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ItemTypeSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
