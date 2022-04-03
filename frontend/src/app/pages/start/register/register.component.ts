import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthController, UserRegisterDto } from 'src/app/client/api';
import { EMAIL_MAX_LENGTH, NICKNAME_MAX_LENGTH, NICKNAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from 'src/app/client/config/frontend.config';
import { FormInputOptions } from 'src/app/common/definitions/forms';
import { RepositoryService } from 'src/app/common/services/repository.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { ValidatorService } from 'src/app/common/services/validator.service';
import { EngineService } from 'src/app/core/services/engine.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(
      null, [Validators.required, Validators.email, Validators.maxLength(EMAIL_MAX_LENGTH)],
    ),
    nickname: new FormControl(
      null, [Validators.required, Validators.minLength(NICKNAME_MIN_LENGTH), Validators.maxLength(NICKNAME_MAX_LENGTH)],
    ),
    password: new FormControl(
      null, [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH)],
    ),
    passwordConfirm: new FormControl(
      null, [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH)],
    ),
  });
  fields: FormInputOptions[] = [
    { form: this.form, key: 'email', label: 'start.email', type: 'email' },
    { form: this.form, key: 'nickname', label: 'start.nickname', type: 'text' },
    { form: this.form, key: 'password', label: 'start.password', type: 'password' },
    { form: this.form, key: 'passwordConfirm', label: 'start.passwordConfirm', type: 'password' },
  ];
  submitLoading: boolean = false;

  get email(): FormControl { return this.form.get('email') as FormControl; }
  get nickname(): FormControl { return this.form.get('nickname') as FormControl; }
  get password(): FormControl { return this.form.get('password') as FormControl; }
  get passwordConfirm(): FormControl { return this.form.get('passwordConfirm') as FormControl; }

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private authController: AuthController,
    private engineService: EngineService,
    private repositoryService: RepositoryService,
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
    return this.password.value === this.passwordConfirm.value;
  }

  register() {
    if (!this.form.valid) { this.toastService.showError('errors.formInvalid', 'errors.formInvalidHint'); return; }
    if (!this.validatePasswords()) { this.toastService.showError('errors.error', 'start.passwordsMismatch'); return; }
    if (!this.validatorService.checkBannedWords(this.nickname.value)) return;

    const user: UserRegisterDto = {
      email: this.email.value,
      nickname: this.nickname.value,
      password: this.password.value,
    };
    this.submitLoading = true;
    this.authController.register(user).subscribe(user => {
      this.submitLoading = false;
      this.toastService.showSuccess('start.registerSuccess', 'start.confirmEmail');
      this.router.navigate(['../start/login']);
    }, _ => {
      this.submitLoading = false;
    });
  }

}
