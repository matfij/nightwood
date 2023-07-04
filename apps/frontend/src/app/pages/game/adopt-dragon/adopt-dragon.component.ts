import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionController, DragonAdoptDto, DragonNature } from 'src/app/client/api';
import { AdoptStepName, AdoptAnswer } from 'src/app/core/definitions/dragons';
import { FormInputOptions } from 'src/app/common/definitions/forms';
import { ToastService } from 'src/app/common/services/toast.service';
import { DRAGON_NAME_MAX_LENGTH, DRAGON_NAME_MIN_LENGTH } from 'src/app/client/config/frontend.config';
import { ValidatorService } from 'src/app/common/services/validator.service';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { ADOPT_STEPS } from 'src/app/core/data/dragons';

@Component({
  selector: 'app-adopt-dragon',
  templateUrl: './adopt-dragon.component.html',
  styleUrls: ['./adopt-dragon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdoptDragonComponent implements OnInit {

  adoptStepName = AdoptStepName;
  adoptSteps = ADOPT_STEPS;
  currentStep = AdoptStepName.Trait;
  adoptAnswers: AdoptAnswer[] = [];
  adoptForm = new FormGroup({
    name: new FormControl<string|null>(
      null,
      [Validators.required, Validators.minLength(DRAGON_NAME_MIN_LENGTH), Validators.maxLength(DRAGON_NAME_MAX_LENGTH)],
    )
  });
  adoptFormFields: FormInputOptions[] = [
    { form: this.adoptForm, key: 'name', label: '', type: 'text' },
  ];
  adopt$ = new Observable();
  adoptLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private actionController: ActionController,
    private toastService: ToastService,
    private validatorService: ValidatorService,
  ) {}

  ngOnInit(): void {
    this.currentStep = AdoptStepName.Trait;
    this.adoptAnswers = [];
  }

  saveAnswer(answer: AdoptAnswer) {
    this.currentStep += 1;
    this.adoptAnswers.push(answer);
  }

  determineNature(): DragonNature {
    const calculatedPoints = Object.keys(DragonNature).map((nature) => {
      return {
        nature: DragonNature[nature as DragonNature],
        points: 0,
      };
    });

    this.adoptAnswers.forEach((answer: AdoptAnswer) => {
      answer.points.forEach((naturePoints) => {
        calculatedPoints.find((points) => points.nature === naturePoints.nature)!.points += naturePoints.value;
      });
    });

    const chosenNature = calculatedPoints.sort((x, y) => x.points - y.points)[calculatedPoints.length - 1];
    return chosenNature.nature;
  }

  validateDragonName(name: string): boolean {
    name = name.replace(' ', '');
    if (name.length < DRAGON_NAME_MIN_LENGTH || name.length > DRAGON_NAME_MAX_LENGTH) {
      return false;
    }
    if (!this.validatorService.checkBannedWords(name)) {
      return false;
    }
    return true;
  }

  adoptDragon() {
    if (!this.adoptForm.value.name || !this.adoptForm.valid) {
      this.toastService.showError('errors.formInvalid', 'errors.formInvalidHint');
      return;
    }
    if (!this.validateDragonName(this.adoptForm.value.name)) {
      this.toastService.showError('errors.formInvalid', 'errors.formInvalidHint');
      return;
    }
    const dragon: DragonAdoptDto = {
      name: this.adoptForm.value.name,
      nature: this.determineNature(),
    };
    this.adoptLoading$?.next(true);
    this.adopt$ = this.actionController.adoptDragon(dragon)
      .pipe(
        tap(() => {
          this.adoptLoading$?.next(false);
          this.toastService.showSuccess('common.success', 'dragon.adoptSuccess');
          this.router.navigate(['game', 'my-dragons'])
        }),
        catchError((err) => {
          this.adoptLoading$?.next(false);
          throw err;
        })
      );
  }
}
