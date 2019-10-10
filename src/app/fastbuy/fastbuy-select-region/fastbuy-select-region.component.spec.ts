import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastbuySelectRegionComponent } from './fastbuy-select-region.component';

describe('FastbuySelectRegionComponent', () => {
  let component: FastbuySelectRegionComponent;
  let fixture: ComponentFixture<FastbuySelectRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastbuySelectRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastbuySelectRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
