import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinatinsListComponent } from './combinatins-list.component';

describe('CombinatinsListComponent', () => {
  let component: CombinatinsListComponent;
  let fixture: ComponentFixture<CombinatinsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombinatinsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinatinsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
