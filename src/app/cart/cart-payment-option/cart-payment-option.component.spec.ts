import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPaymentOptionComponent } from './cart-payment-option.component';

describe('CartPaymentOptionComponent', () => {
  let component: CartPaymentOptionComponent;
  let fixture: ComponentFixture<CartPaymentOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartPaymentOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPaymentOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
