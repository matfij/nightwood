import { FormGroup } from "@angular/forms";


export enum FieldType {
  SIMPLE,
  INTEGER,
  TEXTAREA,
  SELECT,
  CHECKBOX,
}

export interface FormInputOptions {
  form: FormGroup;
  key: string;
  label: string;
  type?: string;

  hint?: string;
  fieldType?: FieldType;
  autocomplete?: string;
}
