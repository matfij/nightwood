import { Component, OnInit } from '@angular/core';
import { DragonNature } from 'src/app/common/definitions/dragons';

@Component({
  selector: 'app-adopt-dragon',
  templateUrl: './adopt-dragon.component.html',
  styleUrls: ['./adopt-dragon.component.scss']
})
export class AdoptDragonComponent implements OnInit {

  adoptStages: AdoptStage[] = [
    {
      step: AdoptStep.Trait,
      question: 'dragon.traitQuestion',
      answers: [
        { nature: DragonNature.Fire, value: 'dragon.fireTrait' },
        { nature: DragonNature.Water, value: 'dragon.waterTrait' },
        { nature: DragonNature.Wind, value: 'dragon.windTrait' },
        { nature: DragonNature.Earth, value: 'dragon.earthTrait' },
      ]
    },
    {
      step: AdoptStep.Value,
      question: 'dragon.valueQuestion',
      answers: [
        { nature: DragonNature.Fire, value: 'dragon.fireValue' },
        { nature: DragonNature.Water, value: 'dragon.waterValue' },
        { nature: DragonNature.Wind, value: 'dragon.windValue' },
        { nature: DragonNature.Earth, value: 'dragon.earthValue' },
      ]
    },
    {
      step: AdoptStep.Location,
      question: 'dragon.locationQuestion',
      answers: [
        { nature: DragonNature.Fire, value: 'dragon.fireLocation' },
        { nature: DragonNature.Water, value: 'dragon.waterLocation' },
        { nature: DragonNature.Wind, value: 'dragon.windLocation' },
        { nature: DragonNature.Earth, value: 'dragon.earthLocation' },
      ]
    },
  ];
  currentStep: AdoptStep = AdoptStep.Trait;

  constructor() { }

  ngOnInit(): void {
  }

  saveAnswer(answer: AdoptAnswer) {
    this.currentStep += 1;
  }

}

export interface AdoptStage {
  step: AdoptStep;
  question: string;
  answers: AdoptAnswer[];
}

export interface AdoptAnswer {
  nature: DragonNature;
  value: string;
}

export enum AdoptStep {
  Trait,
  Value,
  Location,
  Finished,
}
