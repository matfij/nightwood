import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DragonNature } from 'src/app/client/api';
import { FormInputOptions } from 'src/app/common/definitions/forms';
import { DRAGON_MAX_NAME_LENGTH, DRAGON_MIN_NAME_LENGTH } from 'src/app/core/configuration';

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
  chosenAnswers: AdoptAnswer[] = [];


  form: FormGroup = new FormGroup({
    name: new FormControl(
      null,
      [Validators.required, Validators.minLength(DRAGON_MIN_NAME_LENGTH), Validators.maxLength(DRAGON_MAX_NAME_LENGTH)],
    )
  });
  fields: FormInputOptions[] = [
    { form: this.form, key: 'name', label: 'dragon.name', type: 'text' },
  ];
  submitLoading?: boolean;

  constructor(
  ) {}

  ngOnInit(): void {
    this.currentStep = AdoptStep.Trait;
    this.chosenAnswers = [];
    this.currentStep
  }

  saveAnswer(answer: AdoptAnswer) {
    this.currentStep += 1;
    this.chosenAnswers.push(answer);
  }

  adoptDragon() {
    console.log(this.chosenAnswers)
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
  Name,
  Finished,
}
