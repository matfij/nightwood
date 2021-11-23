import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidator {

  public static fieldValuesMatch(control: AbstractControl, fieldNames: string[]): boolean {
    const values = fieldNames.map(x => control.get(x)?.value);
    console.log(control, values)
    return !!values.reduce(function(a, b) { return (a === b) ? a : NaN; });
  }
}
