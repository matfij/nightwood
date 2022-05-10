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

  checkBannedWords(text: string, isChat: boolean = false): boolean {
    let clear = true;

    if (!isChat) text = text.toLowerCase().replace(/ /g, '');

    BANNED_WORDS.forEach((word) => {
      if (text.includes(word)) { clear = false; console.log(word); }
    });

    if (!clear) this.toastService.showError('errors.error', 'errors.bannedWordUse');

    return clear;
  }
}
