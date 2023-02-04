import { UntypedFormGroup } from "@angular/forms";


export enum FieldType {
  SIMPLE,
  INTEGER,
  TEXTAREA,
  SELECT,
}

export interface FormInputOptions {
  form: UntypedFormGroup;
  key: string;
  label: string;
  type?: string;

  hint?: string;
  fieldType?: FieldType;
  autocomplete?: string;
}
