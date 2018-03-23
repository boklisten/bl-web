import { TestBed, inject } from '@angular/core/testing';

import { CartCheckoutService } from './cart-checkout.service';

describe('CartCheckoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartCheckoutService]
    });
  });

  it('should be created', inject([CartCheckoutService], (service: CartCheckoutService) => {
    expect(service).toBeTruthy();
  }));
});
