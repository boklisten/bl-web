import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchLocationComponent } from './branch-location.component';

describe('BranchLocationComponent', () => {
  let component: BranchLocationComponent;
  let fixture: ComponentFixture<BranchLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
