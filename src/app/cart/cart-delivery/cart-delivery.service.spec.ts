import { TestBed, inject } from '@angular/core/testing';

import { CartDeliveryService } from './cart-delivery.service';

describe('CartDeliveryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartDeliveryService]
    });
  });

  it('should be created', inject([CartDeliveryService], (service: CartDeliveryService) => {
    expect(service).toBeTruthy();
  }));
});
