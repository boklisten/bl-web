import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastbuySelectCoursesComponent } from './fastbuy-select-courses.component';

describe('FastbuySelectCoursesComponent', () => {
  let component: FastbuySelectCoursesComponent;
  let fixture: ComponentFixture<FastbuySelectCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastbuySelectCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastbuySelectCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
