import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAccountApprovedComponent } from './company-account-approved.component';

describe('CompanyAccountApprovedComponent', () => {
  let component: CompanyAccountApprovedComponent;
  let fixture: ComponentFixture<CompanyAccountApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAccountApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAccountApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
