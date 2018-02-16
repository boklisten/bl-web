import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSelectComponent } from './branch-select.component';

describe('BranchSelectComponent', () => {
  let component: BranchSelectComponent;
  let fixture: ComponentFixture<BranchSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
