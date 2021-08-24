import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinetsListComponent } from './clinets-list.component';

describe('ClinetsListComponent', () => {
  let component: ClinetsListComponent;
  let fixture: ComponentFixture<ClinetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinetsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
