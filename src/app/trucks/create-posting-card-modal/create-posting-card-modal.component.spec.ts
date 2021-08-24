import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostingCardModalComponent } from './create-posting-card-modal.component';

describe('CreatePostingCardModalComponent', () => {
  let component: CreatePostingCardModalComponent;
  let fixture: ComponentFixture<CreatePostingCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostingCardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostingCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
