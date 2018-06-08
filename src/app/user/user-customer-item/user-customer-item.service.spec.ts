import { TestBed, inject } from '@angular/core/testing';

import { UserCustomerItemService } from './user-customer-item.service';

describe('UserCustomerItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCustomerItemService]
    });
  });

  it('should be created', inject([UserCustomerItemService], (service: UserCustomerItemService) => {
    expect(service).toBeTruthy();
  }));
});
