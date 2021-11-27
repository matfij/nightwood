import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastrService: ToastrService,
    private translateService: TranslateService,
  ) {}

  showSuccess(title: string, message: string) {
    this.toastrService.success(
      this.translateService.instant(message),
      this.translateService.instant(title),
    );
  }

  showError(title: string, message: string) {
    this.toastrService.error(
      this.translateService.instant(message),
      this.translateService.instant(title),
    );
  }
}
