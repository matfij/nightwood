import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastrService: ToastrService
  ) {}

  showSuccess(title: string, message: string) {
    this.toastrService.success(title, message);
  }
}
