import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();
  email = new FormControl(null, [Validators.required, Validators.email]);

  constructor() {}

  ngOnInit(): void {
  }

  recoverPassword() {
    if (!this.email.valid) return;

    console.log(this.email.value);
  }

  onClose() {
    this.close.next(true);
  }

}
