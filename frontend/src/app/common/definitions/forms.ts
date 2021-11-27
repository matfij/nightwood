import { FormGroup } from "@angular/forms";

export interface FormInputOptions {
  form: FormGroup;
  key: string;
  label: string;
  type: string;
}
