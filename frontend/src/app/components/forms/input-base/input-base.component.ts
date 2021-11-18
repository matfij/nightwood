import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FormInputOptions } from '../../../definitions/interfaces/form-input-options.interface';

@Component({
  selector: 'app-input-base',
  templateUrl: './input-base.component.html',
  styleUrls: ['./input-base.component.scss']
})
export class InputBaseComponent implements OnInit {

  @Input() options!: FormInputOptions;

  field?: FormControl;
  fieldName?: string;

  constructor(
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.field = this.options.form.get(this.options.key) as FormControl;
    this.fieldName = this.translateService.instant(this.options.label);
  }

}