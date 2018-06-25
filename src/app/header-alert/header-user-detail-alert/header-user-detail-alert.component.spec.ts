import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUserDetailAlertComponent } from './header-user-detail-alert.component';

describe('HeaderUserDetailAlertComponent', () => {
  let component: HeaderUserDetailAlertComponent;
  let fixture: ComponentFixture<HeaderUserDetailAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderUserDetailAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUserDetailAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
