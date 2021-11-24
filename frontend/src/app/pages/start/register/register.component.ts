import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthController, RegisterUserDto } from 'src/app/client/api';
import { MAX_NICKNAME_LENGTH, MAX_PASSWORD_LENGTH, MIN_NICKNAME_LENGTH, MIN_PASSWORD_LENGTH } from 'src/app/core/configuration';
import { FormInputOptions } from 'src/app/definitions/interfaces/form-definitions';
import { RepositoryService } from 'src/app/services/repository.service';
import { CustomValidator } from 'src/app/utils/custom-validator';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl(
      null,
      [Validators.required, Validators.email],
    ),
    nickname: new FormControl(
      null,
      [Validators.required, Validators.minLength(MIN_NICKNAME_LENGTH), Validators.maxLength(MAX_NICKNAME_LENGTH)],
    ),
    password: new FormControl(
      null,
      [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH), Validators.maxLength(MAX_PASSWORD_LENGTH)],
    ),
    passwordConfirm: new FormControl(
      null,
      [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH), Validators.maxLength(MAX_PASSWORD_LENGTH)],
    ),
  });
  fields: FormInputOptions[] = [
    { form: this.form, key: 'email', label: 'start.email', type: 'email' },
    { form: this.form, key: 'nickname', label: 'start.nickname', type: 'text' },
    { form: this.form, key: 'password', label: 'start.password', type: 'password' },
    { form: this.form, key: 'passwordConfirm', label: 'start.passwordConfirm', type: 'password' },
  ];
  submitLoading?: boolean;

  get email(): FormControl { return this.form.get('email') as FormControl; }
  get nickname(): FormControl { return this.form.get('nickname') as FormControl; }
  get password(): FormControl { return this.form.get('password') as FormControl; }
  get passwordConfirm(): FormControl { return this.form.get('passwordConfirm') as FormControl; }

  constructor(
    private router: Router,
    private authController: AuthController,
    private repositoryService: RepositoryService,
    private toastService: ToastService,
  ) {}

  private validatePasswords() {
    return this.password.value === this.passwordConfirm.value;
  }

  register() {
    if (!this.form.valid) { this.toastService.showError('errors.formInvalid', 'errors.formInvalidHint'); return; }
    if (!this.validatePasswords()) { this.toastService.showError('errors.error', 'start.passwordsMismatch'); return; }

    const user: RegisterUserDto = {
      email: this.email.value,
      nickname: this.nickname.value,
      password: this.password.value,
    };
    this.submitLoading = true;
    this.authController.register(user).subscribe(x => {
      this.submitLoading = false;
      this.toastService.showSuccess('start.registerSuccess', 'start.registerSuccessHint');

      this.repositoryService.setAccessToken(x.accessToken);
      this.router.navigate(['../game/home']);
    }, _ => {
      this.submitLoading = false;
    });
  }

}
