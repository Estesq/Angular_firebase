import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountApprovedComponent } from './account-approved.component';

describe('AccountApprovedComponent', () => {
  let component: AccountApprovedComponent;
  let fixture: ComponentFixture<AccountApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
