import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemTypeSelectComponent } from './cart-item-type-select.component';

describe('CartItemTypeSelectComponent', () => {
  let component: CartItemTypeSelectComponent;
  let fixture: ComponentFixture<CartItemTypeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartItemTypeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
