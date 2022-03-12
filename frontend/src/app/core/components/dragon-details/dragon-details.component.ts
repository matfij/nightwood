import { Component, Input, OnInit } from '@angular/core';
import { DragonController, DragonSkillsController, DragonSkillsDto, SkillGetDto, SkillLearnDto } from 'src/app/client/api';
import { DisplayDragon, DisplaySkill } from '../../definitions/dragons';
import { DragonService } from '../../services/dragons.service';
import { AbstractModalComponent } from '../../../common/components/abstract-modal/abstract-modal.component';
import { DRAGON_SKILL_DEVELOPMENT_LIMIT } from 'src/app/client/config/frontend.config';

@Component({
  selector: 'app-dragon-details',
  templateUrl: './dragon-details.component.html',
  styleUrls: [
    '../../../common/components/abstract-modal/abstract-modal.component.scss',
    './dragon-details.component.scss',
  ],
})
export class DragonDetailsComponent extends AbstractModalComponent implements OnInit {

  @Input() dragon!: DisplayDragon;

  obtainableSkills: DisplaySkill[] = [];
  skillsLoading: boolean = false;
  learnSkillLoading: boolean = false;

  constructor(
    private dragonController: DragonController,
    private dragonSkillsController: DragonSkillsController,
    private dragonService: DragonService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getObtainableSkills();
  }

  getObtainableSkills() {
    const params: SkillGetDto = {
      requiredNature: this.dragon.nature,
    };
    this.skillsLoading = true;
    this.dragonSkillsController.getSkills(params).subscribe(skills => {
      this.skillsLoading = false;
      this.obtainableSkills = skills.map(skill => this.dragonService.toDisplaySkill(skill));
    }, () => this.skillsLoading = false);
  }

  getSkillProgress(skill: string) {
    return this.dragon.skills[skill as keyof DragonSkillsDto] + `/${DRAGON_SKILL_DEVELOPMENT_LIMIT}`;
  }

  canLearn(skill: DisplaySkill): boolean {
    const progress = this.dragon.skills[skill.uid as keyof DragonSkillsDto];
    return this.dragon.skillPoints > 0 && progress < DRAGON_SKILL_DEVELOPMENT_LIMIT && this.dragon.level >= skill.level;
  }

  learnSkill(skill: DisplaySkill) {
    if (this.dragon.skillPoints < 1 || !this.canLearn(skill)) return;

    const params: SkillLearnDto = {
      skillUid: skill.uid,
      dragonId: this.dragon.id,
    };
    this.learnSkillLoading = true;
    this.dragonController.learnSkill(params).subscribe(dragon => {
      this.learnSkillLoading = false;
      this.dragon = { ...this.dragon, skillPoints: dragon.skillPoints, skills: dragon.skills };
    }, () => this.learnSkillLoading = false);
  }
}
