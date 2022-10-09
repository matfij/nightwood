import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { DragonActionType, DragonDto, DragonNature, ExpeditionGuardianDto, SkillDto } from 'src/app/client/api';
import { DragonMaturity } from '../definitions/dragons';
import { DragonService } from './dragons.service';

describe('DragonsService', () => {
  let service: DragonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot({})],
    });
    service = TestBed.inject(DragonService);
  });

  it('shold be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a proper dragon maturity for each level value', () => {
    const levels = [1, 11, 50, 150];
    const expectedMaturities = [
      DragonMaturity.Infant,
      DragonMaturity.Child,
      DragonMaturity.Adult,
      DragonMaturity.Sage,
    ];

    levels.forEach((level, i) => {
      const maturity = service.getDragonMaturity(level);
      expect(maturity).toBe(expectedMaturities[i]);
    });
  });

  it('should map dragon to display dragon', () => {
    const dragon: DragonDto = {
      id: 0,
      action: {
        type: DragonActionType.Expedition,
        awardCollected: false,
        nextAction: Date.now(),
      },
      skills: {} as any,
      runes: [],
      boosterUid: '',
      booster: {} as any,
      battledWith: [],
      dexterity: 0,
      endurance: 0,
      experience: 0,
      level: 0,
      luck: 0,
      name: 'Alex',
      nature: DragonNature.Fire,
      nextFeed: 0,
      skillPoints: 0,
      stamina: 0,
      strength: 0,
      unlockedExpeditions: [],
      will: 0,
    };

    const displayDragon = service.toDisplayDragon(dragon);

    expect(displayDragon).toBeTruthy();
    expect(displayDragon.name).toBe(dragon.name);
    expect(displayDragon.level).toBe(dragon.level);
    expect(displayDragon.nature).toBe(dragon.nature);
    expect(displayDragon.currentAction).toBe('dragon.actionExpedition');
    expect(displayDragon.image).toBe('assets/img/dragons/fire-1-1.png');
  });

  it('shlould map guardian dragon to display guardian dragon', () => {
    const guardian: ExpeditionGuardianDto = {
      boosterUid: '',
      dexterity: 0,
      endurance: 0,
      level: 0,
      luck: 0,
      name: 'Guard',
      runes: [],
      skills: {} as any,
      strength: 0,
      uid: 'g-1',
      will: 0,
    };

    const displayGuardian = service.toDisplayGuardian(guardian);

    expect(displayGuardian).toBeTruthy();
    expect(displayGuardian.name).toBe(guardian.name);
    expect(displayGuardian.level).toBe(guardian.level);
    expect(displayGuardian.image).toBe(`assets/img/expeditions/${guardian.uid}.png`);
  });

  it('should get proper dragon action name', () => {
    const actionType = DragonActionType.Expedition;

    const actionTypeName = service.getDragonActionName(actionType);

    expect(actionTypeName).toBeTruthy();
    expect(actionTypeName).toBe('dragon.actionExpedition');
  });

  it('should map dragon skill to display skill', () => {
    const skill: SkillDto = {
      uid: 's-1',
      name: 'Fireball',
      level: 10,
      hint: 'Throw a fireball',
      requiredNature: [DragonNature.Fire],
    };

    const displaySkill = service.toDisplaySkill(skill);

    expect(displaySkill).toBeTruthy();
    expect(displaySkill.name).toBe(skill.name);
    expect(displaySkill.image).toBe(`assets/img/skills/${skill.uid}.svg`);
  });
});
