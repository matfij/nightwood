import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthController, UserConfirmDto, UserLoginDto } from 'src/app/client/api';
import { NICKNAME_MAX_LENGTH, NICKNAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from 'src/app/client/config/frontend.config';
import { FormInputOptions } from 'src/app/common/definitions/forms';
import { RepositoryService } from 'src/app/common/services/repository.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { EngineService } from 'src/app/core/services/engine.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    login: new FormControl(
      null, [Validators.required, Validators.minLength(NICKNAME_MIN_LENGTH), Validators.maxLength(NICKNAME_MAX_LENGTH)],
    ),
    password: new FormControl(
      null, [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH)],
    ),
  });
  fields: FormInputOptions[] = [
    { form: this.form, key: 'login', label: 'start.nickname', type: 'text' },
    { form: this.form, key: 'password', label: 'start.password', type: 'password' },
  ];
  confirmLoading: boolean = false;
  submitLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authController: AuthController,
    private toastService: ToastService,
    private engineService: EngineService,
    private repositoryService: RepositoryService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const activationCode = params['token'];
      if (!activationCode) return;
      this.confirm(activationCode);
    })
  }

  confirm(code: string) {
    const params: UserConfirmDto = {
      activationCode: code,
    };
    this.confirmLoading = true;
    this.authController.confirm(params).subscribe(() => {
      this.confirmLoading = false;
      this.toastService.showSuccess('start.loginSuccess', 'start.confirmSuccess');
    }, () => this.confirmLoading = false);
  }

  login() {
    if (!this.form.valid) { this.toastService.showError('errors.formInvalid', 'errors.formInvalidHint'); return; }

    const params: UserLoginDto = {
      nickname: this.form.get('login')?.value,
      password: this.form.get('password')?.value,
    };
    this.submitLoading = true;
    this.authController.login(params)
      .pipe(switchMap(user => {
        this.repositoryService.clearUserData();
        this.repositoryService.setAccessToken(user.accessToken);
        this.repositoryService.setUserData(user);

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
