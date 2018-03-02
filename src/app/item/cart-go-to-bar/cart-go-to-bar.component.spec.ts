import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartGoToBarComponent } from './cart-go-to-bar.component';

describe('CartGoToBarComponent', () => {
  let component: CartGoToBarComponent;
  let fixture: ComponentFixture<CartGoToBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartGoToBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartGoToBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
