import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAgreementConditionsOldComponent } from './info-agreement-conditions-old.component';

describe('InfoAgreementConditionsOldComponent', () => {
  let component: InfoAgreementConditionsOldComponent;
  let fixture: ComponentFixture<InfoAgreementConditionsOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAgreementConditionsOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAgreementConditionsOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
