import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'spreadNumber',
})
export class SpreadNumberPipe implements PipeTransform {
    transform(value: number | string, ...args: any[]): string {
        const numberValue = parseFloat(value.toString());
        return numberValue.toLocaleString(undefined, { minimumFractionDigits: 0 });
    }
}
