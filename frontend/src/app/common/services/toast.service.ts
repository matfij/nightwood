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

  showSuccess(title: string, message: string, titleParams?: any, messageParams?: any) {
    this.toastrService.success(
      this.translateService.instant(message, messageParams),
      this.translateService.instant(title, titleParams),
    );
  }

  showError(title: string, message: string, titleParams?: any, messageParams?: any) {
    this.toastrService.error(
      this.translateService.instant(message, messageParams),
      this.translateService.instant(title, titleParams),
    );
  }
}
