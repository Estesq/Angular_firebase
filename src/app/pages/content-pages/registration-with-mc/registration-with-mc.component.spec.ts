import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationWithMcComponent } from './registration-with-mc.component';

describe('RegistrationWithMcComponent', () => {
  let component: RegistrationWithMcComponent;
  let fixture: ComponentFixture<RegistrationWithMcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationWithMcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationWithMcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
