import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonBattleComponent } from './dragon-battle.component';

describe('DragonBattleComponent', () => {
  let component: DragonBattleComponent;
  let fixture: ComponentFixture<DragonBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragonBattleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
