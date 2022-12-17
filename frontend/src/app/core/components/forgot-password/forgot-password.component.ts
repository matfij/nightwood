import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthController, PasswordRecoverDto } from 'src/app/client/api';
import { EMAIL_MAX_LENGTH } from 'src/app/client/config/frontend.config';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();
  emailOrNickname = new FormControl(null, [Validators.required, Validators.maxLength(EMAIL_MAX_LENGTH)]);
  recoverPasswordLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private authController: AuthController,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
  }

  recoverPassword() {
    if (!this.emailOrNickname.valid) return;

    const params: PasswordRecoverDto = {
      emailOrNickname: this.emailOrNickname.value,
    };
    this.recoverPasswordLoading$.next(true);
    this.authController.recoverPassword(params).subscribe(() => {
      this.toastService.showSuccess('common.success', 'start.recoveryEmailSent');
      this.close.next(true);
    }, () => this.recoverPasswordLoading$.next(false));
  }

  onClose() {
    this.close.next(true);
  }

}
