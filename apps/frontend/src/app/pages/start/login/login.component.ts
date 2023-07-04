import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthController, UserConfirmDto, UserLoginDto } from 'src/app/client/api';
import { NICKNAME_MAX_LENGTH, NICKNAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from 'src/app/client/config/frontend.config';
import { FormInputOptions } from 'src/app/common/definitions/forms';
import { RepositoryService } from 'src/app/common/services/repository.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { EngineService } from 'src/app/core/services/engine.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    nickname: new FormControl<string|null>(
      null,
      [Validators.required, Validators.minLength(NICKNAME_MIN_LENGTH), Validators.maxLength(NICKNAME_MAX_LENGTH)],
    ),
    password: new FormControl<string|null>(
      null,
      [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH)],
    ),
  });
  fields: FormInputOptions[] = [
    { form: this.form, key: 'login', label: 'start.nickname', type: 'text', autocomplete: 'username' },
    { form: this.form, key: 'password', label: 'start.password', type: 'password', autocomplete: 'current-password' },
  ];
  loginLoading$ = new BehaviorSubject<boolean>(false);
  login$ = new Observable();
  confirmLoading$ = new BehaviorSubject<boolean>(false);
  confirm$ = new Observable();
  displayForgotPasswordModal$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authController: AuthController,
    private toastService: ToastService,
    private engineService: EngineService,
    private repositoryService: RepositoryService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const activationCode = params['token'];
      if (!activationCode) return;
      this.confirm(activationCode);
    })
  }

  confirm(code: string) {
    const params: UserConfirmDto = {
      activationCode: code,
    };
    this.confirmLoading$?.next(true);
    this.confirm$ = this.authController.confirm(params)
      .pipe(
        tap(() => {
          this.confirmLoading$?.next(false);
          this.toastService.showSuccess('start.loginSuccess', 'start.confirmSuccess');
        }),
        catchError((err) => {
          this.confirmLoading$?.next(false);
          throw err;
        })
      );
  }

  login() {
    if (!this.form.value.nickname || !this.form.value.password) {
      this.toastService.showError('errors.formInvalid', 'errors.formInvalidHint');
      return;
    }

    const params: UserLoginDto = {
      nickname: this.form.value.nickname,
      password: this.form.value.password,
    };
    this.loginLoading$?.next(true);
    this.login$ = this.authController.login(params)
      .pipe(
        switchMap((user) => {
          this.repositoryService.clearUserData();
          this.repositoryService.setAccessToken(user.accessToken);
          this.repositoryService.setRefreshToken(user.refreshToken);
          this.repositoryService.setUserData(user);
          this.engineService.setInitialState(user);
          return this.engineService.getExpeditionReports();
        }),
        tap(() => {
          this.loginLoading$?.next(false);
          this.toastService.showSuccess('start.loginSuccess', 'start.loginSuccessHint');
          this.router.navigate(['../game/home']);
        }),
        catchError((err) => {
          this.loginLoading$?.next(false);
          throw err;
        })
      );
  }
}
