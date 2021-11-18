import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../client/api.service';
import { ToastService } from '../../../services/toast.service';
import { FormInputOptions } from '../../../definitions/interfaces/form-input-options.interface';
import { MAX_NICKNAME_LENGTH, MIN_NICKNAME_LENGTH, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from '../../../core/configuration';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup = new FormGroup({
    nickname: new FormControl(
      null,
      [Validators.required, Validators.minLength(MIN_NICKNAME_LENGTH), Validators.maxLength(MAX_NICKNAME_LENGTH)],
    ),
    password: new FormControl(
      null,
      [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH), Validators.maxLength(MAX_PASSWORD_LENGTH)],
    ),
  });
  fields: FormInputOptions[] = [
    { form: this.form, key: 'nickname', label: 'start.nickname', type: 'text' },
    { form: this.form, key: 'password', label: 'start.password', type: 'password' },
  ];
  submitLoading?: boolean;

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private repositoryService: RepositoryService,
    private router: Router,
  ) {}

  login() {
    if (!this.form.valid) { this.toastService.showError('errors.formInvalid', 'errors.formInvalidHint'); return; }

    this.submitLoading = true;
    this.apiService.loginUser(this.form.value).subscribe(x => {
      this.submitLoading = false;
      this.toastService.showSuccess('start.loginSuccess', 'start.loginSuccessHint');

      this.repositoryService.setAccessToken(x.accessToken!);
      this.router.navigate(['../game/home']);
    }, _ => {
      this.submitLoading = false;
      this.toastService.showError('start.loginError', 'start.loginErrorHint');
    });
  }

}
