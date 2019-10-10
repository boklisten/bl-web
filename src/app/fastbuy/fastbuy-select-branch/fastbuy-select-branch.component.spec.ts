import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastbuySelectBranchComponent } from './fastbuy-select-branch.component';

describe('FastbuySelectBranchComponent', () => {
  let component: FastbuySelectBranchComponent;
  let fixture: ComponentFixture<FastbuySelectBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastbuySelectBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastbuySelectBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
