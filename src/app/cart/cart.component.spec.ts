import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartComponent} from './cart.component';
import {Component, Injectable, Input} from "@angular/core";
import {CartService} from "./cart.service";

@Injectable()
class CartStubService {
	isEmpty() {

	}

	getCart() {
		return [];
	}
}

@Component({selector: 'app-item-display', template: ''})
class ItemDisplayStubComponent {
	@Input() compact;
	@Input() inCart;
	@Input() item;
	@Input() customerItem;
	@Input() branchItem;
	@Input() branch;
}


@Component({selector: 'app-cart-checkout', template: ''})
class CartCheckoutStubComponent {
}

@Component({selector: 'app-cart-order-checkout', template: ''})
class CartOrderCheckoutStubComponent {
}

@Component({selector: 'app-cart-empty', template: ''})
class CartEmpytStubComponent {
}


@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon;
	@Input() size;
}


describe('CartComponent', () => {
	let component: CartComponent;
	let fixture: ComponentFixture<CartComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				CartComponent,
				ItemDisplayStubComponent,
				FaIconStubComponent,
				CartCheckoutStubComponent,
        CartEmpytStubComponent,
        CartOrderCheckoutStubComponent
			],
			providers: [
				{provide: CartService, useValue: new CartStubService()}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
