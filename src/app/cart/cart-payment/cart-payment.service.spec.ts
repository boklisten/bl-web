import { TestBed, inject } from '@angular/core/testing';

import { CartPaymentService } from './cart-payment.service';

describe('CartPaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartPaymentService]
    });
  });

  it('should be created', inject([CartPaymentService], (service: CartPaymentService) => {
    expect(service).toBeTruthy();
  }));
});
