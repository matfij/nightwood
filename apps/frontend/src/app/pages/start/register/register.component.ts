import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { AuthController, UserRegisterDto } from 'src/app/client/api';
import { EMAIL_MAX_LENGTH, NICKNAME_MAX_LENGTH, NICKNAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from 'src/app/client/config/frontend.config';
import { FormInputOptions } from 'src/app/common/definitions/forms';
import { ToastService } from 'src/app/common/services/toast.service';
import { ValidatorService } from 'src/app/common/services/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl<string|null>(
      null,
      [Validators.required, Validators.email, Validators.maxLength(EMAIL_MAX_LENGTH)],
    ),
    nickname: new FormControl<string|null>(
      null,
      [Validators.required, Validators.minLength(NICKNAME_MIN_LENGTH), Validators.maxLength(NICKNAME_MAX_LENGTH)],
    ),
    password: new FormControl<string|null>(
      null,
      [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH)],
    ),
    passwordConfirm: new FormControl<string|null>(
      null,
      [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH)],
    ),
  });
  fields: FormInputOptions[] = [
    { form: this.form, key: 'email', label: 'start.email', type: 'email', autocomplete: 'email' },
    { form: this.form, key: 'nickname', label: 'start.nickname', type: 'text', autocomplete: 'off' },
    { form: this.form, key: 'password', label: 'start.password', type: 'password', autocomplete: 'new-password' },
    { form: this.form, key: 'passwordConfirm', label: 'start.passwordConfirm', type: 'password', autocomplete: 'new-password' },
  ];
  submitLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  register$ = new Observable();

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private authController: AuthController,
    private toastService: ToastService,
    private validatorService: ValidatorService,
  ) {}

  ngOnInit(): void {
    const nickname = this.fields.filter(field => field.key === 'nickname')[0];
    const password = this.fields.filter(field => field.key === 'password')[0];

    nickname.hint = this.translateService.instant('start.nicknameHint', { min: NICKNAME_MIN_LENGTH, max: NICKNAME_MAX_LENGTH });
    password.hint = this.translateService.instant('start.passwordHint', { min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH });
  }

  private validatePasswords() {
    return this.form.value.password === this.form.value.passwordConfirm;
  }

  register() {
    if (!this.form.valid || !this.form.value.email || !this.form.value.nickname || !this.form.value.password) {
      this.toastService.showError('errors.formInvalid', 'errors.formInvalidHint');
      return;
    }
    if (!this.validatePasswords()) {
      this.toastService.showError('errors.error', 'start.passwordsMismatch');
      return;
    }
    if (this.form.value.nickname && !this.validatorService.checkBannedWords(this.form.value.nickname)) {
      return;
    }

    const user: UserRegisterDto = {
      email: this.form.value.email,
      nickname: this.form.value.nickname,
      password: this.form.value.password,
    };
    this.submitLoading$.next(true);
    this.register$ = this.authController.register(user)
      .pipe(
        tap(() => {
          this.submitLoading$.next(false);
          this.toastService.showSuccess('start.registerSuccess', 'start.confirmEmail');
          this.router.navigate(['../start/login']);
        }),
        catchError((err) => {
          this.submitLoading$.next(false);
          throw err;
        })
      );
  }
}
