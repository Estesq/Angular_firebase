import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserPageComponent } from './parser-page.component';

describe('ParserPageComponent', () => {
  let component: ParserPageComponent;
  let fixture: ComponentFixture<ParserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParserPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
