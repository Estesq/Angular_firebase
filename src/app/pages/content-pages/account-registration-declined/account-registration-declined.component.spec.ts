import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRegistrationDeclinedComponent } from './account-registration-declined.component';

describe('AccountRegistrationDeclinedComponent', () => {
  let component: AccountRegistrationDeclinedComponent;
  let fixture: ComponentFixture<AccountRegistrationDeclinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountRegistrationDeclinedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRegistrationDeclinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
