import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteClientComponent } from './invite-client.component';

describe('InviteClientComponent', () => {
  let component: InviteClientComponent;
  let fixture: ComponentFixture<InviteClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
