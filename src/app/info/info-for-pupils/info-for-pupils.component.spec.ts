import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoForPupilsComponent } from './info-for-pupils.component';

describe('InfoForPupilsComponent', () => {
  let component: InfoForPupilsComponent;
  let fixture: ComponentFixture<InfoForPupilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoForPupilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoForPupilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
