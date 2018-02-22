import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSetComponent } from './branch-set.component';

describe('BranchSetComponent', () => {
  let component: BranchSetComponent;
  let fixture: ComponentFixture<BranchSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
