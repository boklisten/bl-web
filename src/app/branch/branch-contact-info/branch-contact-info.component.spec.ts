import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchContactInfoComponent } from './branch-contact-info.component';

describe('BranchContactInfoComponent', () => {
  let component: BranchContactInfoComponent;
  let fixture: ComponentFixture<BranchContactInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchContactInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
