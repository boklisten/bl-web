import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAgreementTermsComponent } from './info-agreement-terms.component';

describe('InfoAgreementTermsComponent', () => {
  let component: InfoAgreementTermsComponent;
  let fixture: ComponentFixture<InfoAgreementTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAgreementTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAgreementTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
