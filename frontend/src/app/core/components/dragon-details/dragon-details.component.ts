import { Component, Input, OnInit } from '@angular/core';
import { retryWhen } from 'rxjs/operators';
import { DragonController, DragonSkillsController, DragonSkillsDto, GetSkillsDto, LearnskillDto } from 'src/app/client/api';
import { DRAGON_SKILL_LIMIT } from '../../configuration';
import { DisplayDragon, DisplaySkill } from '../../definitions/dragons';
import { DragonService } from '../../services/dragons.service';
import { AbstractModalComponent } from '../abstract-modal/abstract-modal.component';

@Component({
  selector: 'app-dragon-details',
  templateUrl: './dragon-details.component.html',
  styleUrls: [
    './dragon-details.component.scss',
    '../abstract-modal/abstract-modal.component.scss'
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
    return this.dragon.skills[this.getSkillName(skill)] + `/${DRAGON_SKILL_LIMIT}`;
  }

  canLearn(skill: string): boolean {
    const progress = this.dragon.skills[this.getSkillName(skill)];
    return progress < DRAGON_SKILL_LIMIT;
  }

  learnSkill(skillName: string) {
    if (this.dragon.skillPoints < 1 || !this.canLearn(skillName)) return;

    const params: LearnskillDto = {
      skillName: skillName,
      dragonId: this.dragon.id,
    };
    this.learnSkillLoading = true;
    this.dragonController.learnSkill(params).subscribe(dragon => {
      this.learnSkillLoading = false;
      this.dragon = { ...this.dragon, skillPoints: dragon.skillPoints, skills: dragon.skills };
    }, () => this.learnSkillLoading = false);
  }
}
