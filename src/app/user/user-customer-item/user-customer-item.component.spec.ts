import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCustomerItemComponent } from './user-customer-item.component';

describe('UserCustomerItemComponent', () => {
  let component: UserCustomerItemComponent;
  let fixture: ComponentFixture<UserCustomerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCustomerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCustomerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
