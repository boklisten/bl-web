import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFrontpageComponent } from './header-frontpage.component';

describe('HeaderFrontpageComponent', () => {
  let component: HeaderFrontpageComponent;
  let fixture: ComponentFixture<HeaderFrontpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderFrontpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
