import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderItemInfoComponent} from './order-item-info.component';
import {Component, Injectable, Input, Pipe} from "@angular/core";
import {CustomerItemService} from "@boklisten/bl-connect";

@Injectable()
class CustomerItemStubService {

}

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon;
}

@Pipe({name: 'blcDate'})
class BlcDateStubPipe {

}

@Pipe({name: 'blcPrice'})
class BlcPriceStubPipe {

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
				{provide: CustomerItemService, useClass: CustomerItemStubService}
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
