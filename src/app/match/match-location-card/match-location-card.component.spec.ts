import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchLocationCardComponent } from './match-location-card.component';

describe('MatchLocationCardComponent', () => {
  let component: MatchLocationCardComponent;
  let fixture: ComponentFixture<MatchLocationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchLocationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchLocationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
