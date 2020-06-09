import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCoronaComponent } from './info-corona.component';

describe('InfoCoronaComponent', () => {
  let component: InfoCoronaComponent;
  let fixture: ComponentFixture<InfoCoronaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCoronaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCoronaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
