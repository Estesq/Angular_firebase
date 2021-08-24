import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegistrationDeclinedComponent } from './company-registration-declined.component';

describe('CompanyRegistrationDeclinedComponent', () => {
  let component: CompanyRegistrationDeclinedComponent;
  let fixture: ComponentFixture<CompanyRegistrationDeclinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyRegistrationDeclinedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRegistrationDeclinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
