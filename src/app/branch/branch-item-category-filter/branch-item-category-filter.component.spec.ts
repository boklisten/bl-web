import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchItemCategoryFilterComponent } from './branch-item-category-filter.component';

describe('BranchItemCategoryFilterComponent', () => {
  let component: BranchItemCategoryFilterComponent;
  let fixture: ComponentFixture<BranchItemCategoryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchItemCategoryFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchItemCategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
