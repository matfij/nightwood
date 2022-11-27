import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DragonController, DragonSkillsController, DragonSkillsDto, SkillGetDto, SkillLearnDto } from 'src/app/client/api';
import { DisplayDragon, DisplaySkill } from '../../definitions/dragons';
import { DragonService } from '../../services/dragons.service';
import { AbstractModalComponent } from '../../../common/components/abstract-modal/abstract-modal.component';
import { DRAGON_SKILL_DEVELOPMENT_LIMIT } from 'src/app/client/config/frontend.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dragon-skills',
  templateUrl: './dragon-skills.component.html',
  styleUrls: [
    '../../../common/components/abstract-modal/abstract-modal.component.scss',
    './dragon-skills.component.scss',
  ],
})
export class DragonSkillsComponent extends AbstractModalComponent implements OnInit {

  @Input() dragon!: DisplayDragon;

  obtainableSkills$?: Observable<DisplaySkill[]>;
  dragonLoading: boolean = false;
  skillsLoading: boolean = false;
  learnSkillLoading: boolean = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private dragonController: DragonController,
    private dragonSkillsController: DragonSkillsController,
    private dragonService: DragonService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.updateDragonData();
    this.getObtainableSkills();
  }

  updateDragonData() {
    this.dragonLoading = true;
    this.dragonController.getOne(this.dragon.id.toString()).subscribe(dragon => {
      this.dragonLoading = false;
      this.dragon.skillPoints = dragon.skillPoints;
      this.dragon.skills = dragon.skills;
      this.cdRef.detectChanges();
    }, () => this.dragonLoading = false);
  }

  getObtainableSkills() {
    const params: SkillGetDto = {
      requiredNature: this.dragon.nature,
    };
    this.obtainableSkills$ = this.dragonSkillsController.getSkills(params).pipe(
      map(skills => skills.map(skill => this.dragonService.toDisplaySkill(skill)))
    );
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
      this.cdRef.detectChanges();
    }, () => this.learnSkillLoading = false);
  }
}
