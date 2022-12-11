import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { DragonController, DragonDto, DragonSkillsController, DragonSkillsDto, SkillGetDto, SkillLearnDto } from 'src/app/client/api';
import { DisplaySkill } from '../../definitions/dragons';
import { DragonService } from '../../services/dragons.service';
import { AbstractModalComponent } from '../../../common/components/abstract-modal/abstract-modal.component';
import { DRAGON_SKILL_DEVELOPMENT_LIMIT } from 'src/app/client/config/frontend.config';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dragon-skills',
  templateUrl: './dragon-skills.component.html',
  styleUrls: [
    '../../../common/components/abstract-modal/abstract-modal.component.scss',
    './dragon-skills.component.scss',
  ],
})
export class DragonSkillsComponent extends AbstractModalComponent implements OnInit {

  @Input() dragon!: DragonDto;
  @Output() updatedDragon = new EventEmitter<DragonDto>();

  dragon$?: BehaviorSubject<DragonDto>;
  obtainableSkills$?: Observable<DisplaySkill[]>;
  learnSkill$?: Observable<DragonDto>;
  learningSkill: boolean = false;

  constructor(
    private dragonController: DragonController,
    private dragonSkillsController: DragonSkillsController,
    private dragonService: DragonService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.dragon$ = new BehaviorSubject(this.dragon);
    this.getObtainableSkills();
  }

  getObtainableSkills() {
    const params: SkillGetDto = {
      requiredNature: this.dragon.nature,
    };
    this.obtainableSkills$ = this.dragonSkillsController.getSkills(params).pipe(
      map(skills => skills.map(skill => this.dragonService.toDisplaySkill(skill)))
    );
  }

  getSkillProgress(dragon: DragonDto, skill: string) {
    return dragon.skills[skill as keyof DragonSkillsDto] + `/${DRAGON_SKILL_DEVELOPMENT_LIMIT}`;
  }

  canLearn(dragon: DragonDto, skill: DisplaySkill): boolean {
    const progress = dragon.skills[skill.uid as keyof DragonSkillsDto];
    return dragon.skillPoints > 0 && progress < DRAGON_SKILL_DEVELOPMENT_LIMIT && dragon.level >= skill.level;
  }

  learnSkill(dragon: DragonDto, skill: DisplaySkill) {
    if (this.learningSkill) return;
    if (dragon.skillPoints < 1 || !this.canLearn(dragon, skill)) return;

    const params: SkillLearnDto = {
      skillUid: skill.uid,
      dragonId: dragon.id,
    };
    this.learningSkill = true;
    this.learnSkill$ = this.dragonController.learnSkill(params).pipe(
      tap((dragon) => {
        this.learningSkill = false;
        this.dragon$?.next(dragon)
      })
    );
  }

  closeModal() {
    this.updatedDragon.next(this.dragon$?.getValue());
  }
}
