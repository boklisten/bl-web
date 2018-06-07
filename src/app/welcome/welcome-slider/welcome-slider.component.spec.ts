import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeSliderComponent } from './welcome-slider.component';

describe('WelcomeSliderComponent', () => {
  let component: WelcomeSliderComponent;
  let fixture: ComponentFixture<WelcomeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
