import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormInputOptions } from '../../../definitions/interfaces/form-input-options.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    nickname: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
  });
  fields: FormInputOptions[] = [
    { form: this.form, key: 'nickname', label: 'Nickname', type: 'text' },
    { form: this.form, key: 'password', label: 'Password', type: 'password' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.form.value);
  }
}
