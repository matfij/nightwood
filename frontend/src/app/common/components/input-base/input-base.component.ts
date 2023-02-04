import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FieldType, FormInputOptions } from 'src/app/common/definitions/forms';

@Component({
  selector: 'app-input-base',
  templateUrl: './input-base.component.html',
  styleUrls: ['./input-base.component.scss']
})
export class InputBaseComponent implements OnInit {

  @Input() options!: FormInputOptions;

  field?: UntypedFormControl;
  fieldName?: string;

  FieldType = FieldType;

  constructor(
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.options.fieldType = this.options.fieldType ?? FieldType.SIMPLE;

    this.field = this.options.form.get(this.options.key) as UntypedFormControl;
    this.fieldName = this.options.label ? this.translateService.instant(this.options.label) : '';
  }

}
