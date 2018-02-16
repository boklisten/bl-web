import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOpeningHoursComponent } from './branch-opening-hours.component';

describe('BranchOpeningHoursComponent', () => {
  let component: BranchOpeningHoursComponent;
  let fixture: ComponentFixture<BranchOpeningHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchOpeningHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchOpeningHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
