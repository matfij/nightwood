import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateDragonDto, DragonController, DragonNature } from 'src/app/client/api';
import { AdoptStage, AdoptStep, AdoptAnswer, NaturePoints } from 'src/app/common/definitions/dragons';
import { FormInputOptions } from 'src/app/common/definitions/forms';
import { ToastService } from 'src/app/common/services/toast.service';
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
        { label: 'dragon.fireTrait', points: this.setNaturePoints(90, 30, 10, 40) },
        { label: 'dragon.waterTrait', points: this.setNaturePoints(40, 100, 30, 20) },
        { label: 'dragon.windTrait', points: this.setNaturePoints(20, 20, 90, 5) },
        { label: 'dragon.earthTrait', points: this.setNaturePoints(15, 25, 10, 80) },
      ]
    },
    {
      step: AdoptStep.Value,
      question: 'dragon.valueQuestion',
      answers: [
        { label: 'dragon.fireValue', points: this.setNaturePoints(80, 60, 50, 50) },
        { label: 'dragon.waterValue', points: this.setNaturePoints(10, 80, 50, 30) },
        { label: 'dragon.windValue', points: this.setNaturePoints(70, 40, 90, 20) },
        { label: 'dragon.earthValue', points: this.setNaturePoints(30, 50, 20, 70) },
      ]
    },
    {
      step: AdoptStep.Location,
      question: 'dragon.locationQuestion',
      answers: [
        { label: 'dragon.fireLocation', points: this.setNaturePoints(60, 40, 50, 50) },
        { label: 'dragon.waterLocation', points: this.setNaturePoints(-10, 90, 30, 40) },
        { label: 'dragon.windLocation', points: this.setNaturePoints(30, 10, 60, 50) },
        { label: 'dragon.earthLocation', points: this.setNaturePoints(40, 10, 10, 60) },
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

  get dragonName(): FormControl { return this.form.get('name') as FormControl; }

  constructor(
    private router: Router,
    private dragonController: DragonController,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.currentStep = AdoptStep.Trait;
    this.chosenAnswers = [];
    this.currentStep
  }

  setNaturePoints(fire: number, water: number, wind: number, earth: number): NaturePoints[] {
    return [
      { nature: DragonNature.Fire, value: fire },
      { nature: DragonNature.Water, value: water },
      { nature: DragonNature.Wind, value: wind },
      { nature: DragonNature.Earth, value: earth },
    ]
  }

  saveAnswer(answer: AdoptAnswer) {
    this.currentStep += 1;
    this.chosenAnswers.push(answer);
  }

  determineNature(): DragonNature {
    const calculatedPoints = Object.keys(DragonNature).map(x => {
      return {
        nature: DragonNature[x as DragonNature],
        points: 0,
      };
    });

    this.chosenAnswers.forEach((adoptAnswer: AdoptAnswer) => {
      adoptAnswer.points.forEach((naturePoints: NaturePoints) => {
        calculatedPoints.find(x => x.nature === naturePoints.nature)!.points += naturePoints.value;
      });
    });

    const chosenNature = calculatedPoints.sort((x, y) => x.points + y.points)[0];
    return chosenNature.nature;
  }

  adoptDragon() {
    if (!this.form.valid) { this.toastService.showError('errors.formInvalid', 'errors.formInvalidHint'); return; }

    const dragon: CreateDragonDto = {
      name: this.dragonName.value,
      nature: this.determineNature(),
    };
    this.submitLoading = true;
    this.dragonController.create(dragon).subscribe(x => {
      this.submitLoading = false;

    }, _ => this.submitLoading = false);
  }

}

