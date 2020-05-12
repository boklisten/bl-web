import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDisplayComponent } from './booking-display.component';

describe('BookingDisplayComponent', () => {
  let component: BookingDisplayComponent;
  let fixture: ComponentFixture<BookingDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
