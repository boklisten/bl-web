import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeliveryInfoComponent } from './order-delivery-info.component';

describe('OrderDeliveryInfoComponent', () => {
  let component: OrderDeliveryInfoComponent;
  let fixture: ComponentFixture<OrderDeliveryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDeliveryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDeliveryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
