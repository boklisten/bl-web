import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPartlyPaymentInfoComponent } from './cart-partly-payment-info.component';

describe('CartPartlyPaymentInfoComponent', () => {
  let component: CartPartlyPaymentInfoComponent;
  let fixture: ComponentFixture<CartPartlyPaymentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartPartlyPaymentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPartlyPaymentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
