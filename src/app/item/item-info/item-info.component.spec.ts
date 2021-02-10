import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemInfoComponent} from './item-info.component';
import {Component, Injectable, Input} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {BranchService, ItemService} from "@boklisten/bl-connect";
import {CartService} from "../../cart/cart.service";

@Injectable()
class ActivatedRouteStub {
	snapshot = {
		paramMap: {
			get: () => ''
		}
	};
}

@Injectable()
class ItemStubService {
	getById(id: any) {
		return new Promise((resolve, reject) => {

		});
	}
}

@Injectable()
class CartStubService {

}

@Injectable()
class BranchStubService {

}

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon: any;
}

@Component({selector: 'app-item-add', template: ''})
class ItemAddStubComponent {
	@Input() item: any;
}


describe('ItemInfoComponent', () => {
	let component: ItemInfoComponent;
	let fixture: ComponentFixture<ItemInfoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				ItemInfoComponent,
				FaIconStubComponent,
				ItemAddStubComponent
			],
			providers: [
				{provide: ActivatedRoute, useValue: new ActivatedRouteStub()},
				{provide: ItemService, useValue: new ItemStubService()},
				{provide: CartService, useValue: new CartStubService()},
				{provide: BranchService, useValue: new BranchStubService()}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ItemInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
