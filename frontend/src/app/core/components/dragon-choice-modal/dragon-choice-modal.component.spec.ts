import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonChoiceModalComponent } from './dragon-choice-modal.component';

describe('DragonChoiceModalComponent', () => {
  let component: DragonChoiceModalComponent;
  let fixture: ComponentFixture<DragonChoiceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragonChoiceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonChoiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
