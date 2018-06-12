import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderItemInfoComponent} from './order-item-info.component';
import {Injectable} from "@angular/core";
import {CustomerItemService} from "@wizardcoder/bl-connect";
import {FaIconStubComponent} from "../../../../../test/stubs/fa-icon.component.stub";
import {BlcDateStubPipe} from "../../../../../test/stubs/bl-common/blc-date.pipe.stub";
import {BlcPriceStubPipe} from "../../../../../test/stubs/bl-common/blc-price.pipe.stub";

@Injectable()
class CustomerItemStubService {

}

describe('OrderItemInfoComponent', () => {
	let component: OrderItemInfoComponent;
	let fixture: ComponentFixture<OrderItemInfoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				OrderItemInfoComponent,
				FaIconStubComponent,
				BlcDateStubPipe,
				BlcPriceStubPipe
			],
			providers: [
				{provide: CustomerItemService, useValue: new CustomerItemStubService()}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OrderItemInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
