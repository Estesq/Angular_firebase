import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailersListComponent } from './trailers-list.component';

describe('TrailersListComponent', () => {
  let component: TrailersListComponent;
  let fixture: ComponentFixture<TrailersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
