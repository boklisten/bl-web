import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchProfileCardComponent } from './match-profile-card.component';

describe('MatchProfileCardComponent', () => {
  let component: MatchProfileCardComponent;
  let fixture: ComponentFixture<MatchProfileCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchProfileCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
