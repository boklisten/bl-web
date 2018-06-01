import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPaymentInfoComponent } from './order-payment-info.component';

describe('OrderPaymentInfoComponent', () => {
  let component: OrderPaymentInfoComponent;
  let fixture: ComponentFixture<OrderPaymentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPaymentInfoComponent ]
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
