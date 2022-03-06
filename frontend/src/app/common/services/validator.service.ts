import { Injectable } from '@angular/core';
import { BANNED_WORDS } from 'src/app/client/config/banned-words';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {

  constructor(
    private toastService: ToastService,
  ) {}

  checkBannedWords(text: string): boolean {
    let clear = true;

    text = text.toLowerCase().replace(/ /g, '');

    BANNED_WORDS.forEach((word) => {
      if (text.includes(word)) clear = false;
    });

    if (!clear) this.toastService.showError('errors.error', 'errors.bannedWordUse');

    return clear;
  }
}
