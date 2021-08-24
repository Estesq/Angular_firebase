import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegistrationCompleteComponent } from './company-registration-complete.component';

describe('CompanyRegistrationCompleteComponent', () => {
  let component: CompanyRegistrationCompleteComponent;
  let fixture: ComponentFixture<CompanyRegistrationCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyRegistrationCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRegistrationCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
