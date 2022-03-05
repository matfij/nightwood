import { FormGroup } from "@angular/forms";


export enum FieldType {
  SIMPLE,
  TEXTAREA,
  SELECT,
}

export interface FormInputOptions {
  form: FormGroup;
  key: string;
  label: string;
  type: string;

  hint?: string;
  fieldType?: FieldType;
}
