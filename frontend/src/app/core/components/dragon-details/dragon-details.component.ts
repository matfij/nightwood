import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DragonSkillsController, GetSkillsDto, SkillDto } from 'src/app/client/api';
import { DisplayDragon, DisplaySkill } from '../../definitions/dragons';
import { DragonService } from '../../services/dragons.service';

@Component({
  selector: 'app-dragon-details',
  templateUrl: './dragon-details.component.html',
  styleUrls: ['./dragon-details.component.scss']
})
export class DragonDetailsComponent implements OnInit {

  @Input() dragon!: DisplayDragon;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  obtainableSkills: DisplaySkill[] = [];
  skillsLoading: boolean = false;

  constructor(
    private dragonSkillsController: DragonSkillsController,
    private dragonService: DragonService,
  ) {}

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

  closeModal() {
    this.close.next(true);
  }

}
