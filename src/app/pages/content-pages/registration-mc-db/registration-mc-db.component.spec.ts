import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationMcDbComponent } from './registration-mc-db.component';

describe('RegistrationMcDbComponent', () => {
  let component: RegistrationMcDbComponent;
  let fixture: ComponentFixture<RegistrationMcDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationMcDbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationMcDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
