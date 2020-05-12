import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCancelComponent } from './booking-cancel.component';

describe('BookingCancelComponent', () => {
  let component: BookingCancelComponent;
  let fixture: ComponentFixture<BookingCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
