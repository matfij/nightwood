import { trigger, transition, style, animate } from "@angular/animations";

export const FADE_IN = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: '0' }),
    animate('.5s ease-out', style({ opacity: '1' })),
  ]),
]);
