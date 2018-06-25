import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAlertComponent } from './header-alert.component';

describe('HeaderAlertComponent', () => {
  let component: HeaderAlertComponent;
  let fixture: ComponentFixture<HeaderAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
