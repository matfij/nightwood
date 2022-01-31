import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonDetailsComponent } from './dragon-details.component';

describe('DragonDetailsComponent', () => {
  let component: DragonDetailsComponent;
  let fixture: ComponentFixture<DragonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragonDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
