import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemInfoComponent } from './order-item-info.component';

describe('OrderItemInfoComponent', () => {
  let component: OrderItemInfoComponent;
  let fixture: ComponentFixture<OrderItemInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItemInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
