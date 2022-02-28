import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthController } from 'src/app/client/api';
import { FormInputOptions } from 'src/app/common/definitions/forms';
import { RepositoryService } from 'src/app/common/services/repository.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { MIN_NICKNAME_LENGTH, MAX_NICKNAME_LENGTH, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from 'src/app/core/configuration';
import { EngineService } from 'src/app/core/services/engine.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup = new FormGroup({
    nickname: new FormControl(
      null, [Validators.required, Validators.minLength(MIN_NICKNAME_LENGTH), Validators.maxLength(MAX_NICKNAME_LENGTH)],
    ),
    password: new FormControl(
      null, [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH), Validators.maxLength(MAX_PASSWORD_LENGTH)],
    ),
  });
  fields: FormInputOptions[] = [
    { form: this.form, key: 'nickname', label: 'start.nickname', type: 'text' },
    { form: this.form, key: 'password', label: 'start.password', type: 'password' },
  ];
  submitLoading: boolean = false;

  constructor(
    private router: Router,
    private authController: AuthController,
    private toastService: ToastService,
    private engineService: EngineService,
    private repositoryService: RepositoryService,
  ) {}

  login() {
    if (!this.form.valid) { this.toastService.showError('errors.formInvalid', 'errors.formInvalidHint'); return; }

    this.submitLoading = true;
    this.authController.login(this.form.value)
      .pipe(switchMap(user => {
        this.repositoryService.clearUserData();
        this.repositoryService.setAccessToken(user.accessToken);
        this.repositoryService.setUserData(user);

        this.engineService.start();
        this.engineService.setInitialState(user);
        return this.engineService.getExpeditionReports();
      })).subscribe(() => {
        this.submitLoading = false;
        this.toastService.showSuccess('start.loginSuccess', 'start.loginSuccessHint');
        this.router.navigate(['../game/home']);
    }, () => {
      this.submitLoading = false;
    });
  }

}
