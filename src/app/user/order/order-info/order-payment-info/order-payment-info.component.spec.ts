import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderPaymentInfoComponent} from './order-payment-info.component';
import {FaIconStubComponent} from "../../../../../test/stubs/fa-icon.component.stub";
import {BlcPriceStubPipe} from "../../../../../test/stubs/bl-common/blc-price.pipe.stub";
import {Injectable} from "@angular/core";
import {PaymentService} from "@wizardcoder/bl-connect";

@Injectable()
class PaymentStubService {

}

describe('OrderPaymentInfoComponent', () => {
	let component: OrderPaymentInfoComponent;
	let fixture: ComponentFixture<OrderPaymentInfoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				OrderPaymentInfoComponent,
				FaIconStubComponent,
				BlcPriceStubPipe
			],
			providers: [
				{provide: PaymentService, useValue: new PaymentStubService()}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OrderPaymentInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
