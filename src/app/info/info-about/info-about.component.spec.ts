import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAboutComponent } from './info-about.component';

describe('InfoAboutComponent', () => {
  let component: InfoAboutComponent;
  let fixture: ComponentFixture<InfoAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
