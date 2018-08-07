import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartConfirmComponent } from './cart-confirm.component';

describe('CartConfirmComponent', () => {
  let component: CartConfirmComponent;
  let fixture: ComponentFixture<CartConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
