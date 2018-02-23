import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAgreementComponent } from './info-agreement.component';

describe('InfoAgreementComponent', () => {
  let component: InfoAgreementComponent;
  let fixture: ComponentFixture<InfoAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
