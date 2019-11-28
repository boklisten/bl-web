import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMatchingComponent } from './info-matching.component';

describe('InfoMatchingComponent', () => {
  let component: InfoMatchingComponent;
  let fixture: ComponentFixture<InfoMatchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoMatchingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
