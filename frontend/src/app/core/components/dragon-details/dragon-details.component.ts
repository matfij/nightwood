import { Component, Input, OnInit } from '@angular/core';
import { DragonController, DragonSkillsController, DragonSkillsDto, GetSkillsDto, LearnskillDto } from 'src/app/client/api';
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
    const params: GetSkillsDto = {
      requiredNature: this.dragon.nature,
    };
    this.skillsLoading = true;
    this.dragonSkillsController.getSkills(params).subscribe(skills => {
      this.skillsLoading = false;
      this.obtainableSkills = skills.map(skill => this.dragonService.toDisplaySkill(skill));
    }, () => this.skillsLoading = false);
  }

  getSkillName(name: string) {
    return name.replace(/./, c => c.toLowerCase()) as keyof DragonSkillsDto;
  }

  getSkillProgress(skill: string) {
    return this.dragon.skills[this.getSkillName(skill)] + `/${DRAGON_SKILL_DEVELOPMENT_LIMIT}`;
  }

  canLearn(skill: DisplaySkill): boolean {
    const progress = this.dragon.skills[this.getSkillName(skill.name)];
    return this.dragon.skillPoints > 0 && progress < DRAGON_SKILL_DEVELOPMENT_LIMIT && this.dragon.level >= skill.level;
  }

  learnSkill(skill: DisplaySkill) {
    if (this.dragon.skillPoints < 1 || !this.canLearn(skill)) return;

    const params: LearnskillDto = {
      skillName: skill.name,
      dragonId: this.dragon.id,
    };
    this.learnSkillLoading = true;
    this.dragonController.learnSkill(params).subscribe(dragon => {
      this.learnSkillLoading = false;
      this.dragon = { ...this.dragon, skillPoints: dragon.skillPoints, skills: dragon.skills };
    }, () => this.learnSkillLoading = false);
  }
}
