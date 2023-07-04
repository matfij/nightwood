import { Pipe, PipeTransform } from '@angular/core';
import { DEFAULT_LANG } from 'src/app/core/configuration';

@Pipe({
  name: 'shortNumber',
})
export class ShortNumberPipe implements PipeTransform {

  private locale = DEFAULT_LANG;

  transform(value: number): string {
    const options: FormatterOptions = {
      notation: 'compact',
    };
    const formatter = Intl.NumberFormat(this.locale, options);

    return formatter.format(value);
  }
}

interface FormatterOptions extends Intl.NumberFormatOptions {
  notation: 'compact' | 'standard' | 'scientific' | 'engineering';
}
