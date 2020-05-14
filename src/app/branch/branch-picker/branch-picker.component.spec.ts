import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchPickerComponent } from './branch-picker.component';

describe('BranchPickerComponent', () => {
  let component: BranchPickerComponent;
  let fixture: ComponentFixture<BranchPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
