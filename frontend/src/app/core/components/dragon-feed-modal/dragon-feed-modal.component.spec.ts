import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonFeedModalComponent } from './dragon-feed-modal.component';

describe('DragonFeedModalComponent', () => {
  let component: DragonFeedModalComponent;
  let fixture: ComponentFixture<DragonFeedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragonFeedModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonFeedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
