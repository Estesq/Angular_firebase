import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInfoPanelComponent } from './admin-info-panel.component';

describe('AdminInfoPanelComponent', () => {
  let component: AdminInfoPanelComponent;
  let fixture: ComponentFixture<AdminInfoPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInfoPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
