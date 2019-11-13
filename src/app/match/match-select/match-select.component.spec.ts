import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchSelectComponent } from './match-select.component';

describe('MatchSelectComponent', () => {
  let component: MatchSelectComponent;
  let fixture: ComponentFixture<MatchSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
