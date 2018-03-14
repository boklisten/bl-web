import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPaymentDibsComponent } from './cart-payment-dibs.component';

describe('CartPaymentDibsComponent', () => {
  let component: CartPaymentDibsComponent;
  let fixture: ComponentFixture<CartPaymentDibsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartPaymentDibsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPaymentDibsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
