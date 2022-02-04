import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DragonSkillsController, DragonSkillsDto, GetSkillsDto } from 'src/app/client/api';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragonDetailsComponent extends AbstractModalComponent implements OnInit {

  @Input() dragon!: DisplayDragon;

  obtainableSkills: DisplaySkill[] = [];
  skillsLoading: boolean = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
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
      this.changeDetectorRef.detectChanges();
    }, () => this.skillsLoading = false);
  }

  getSkillProgress(skill: string) {
    return this.dragon.skills[skill.replace(/./, c => c.toLowerCase()) as keyof DragonSkillsDto] + '/10';
  }
}
