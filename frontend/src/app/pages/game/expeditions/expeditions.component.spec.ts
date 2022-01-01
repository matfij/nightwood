import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionsComponent } from './expeditions.component';

describe('ExpeditionsComponent', () => {
  let component: ExpeditionsComponent;
  let fixture: ComponentFixture<ExpeditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpeditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpeditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
