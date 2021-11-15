import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../client/api.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    nickname: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required]),
  });

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {}

  get email(): FormControl { return this.form.get('email') as FormControl; }
  get nickname(): FormControl { return this.form.get('nickname') as FormControl; }
  get password(): FormControl { return this.form.get('password') as FormControl; }

  register() {
    const user = {
      email: this.email.value,
      nickname: this.nickname.value,
      password: this.password.value,
    };
    this.apiService.registerUser(user).subscribe(x => console.log('success', x), x => console.log('error', x));
    this.toastService.showSuccess('success', 'register');
  }

}
