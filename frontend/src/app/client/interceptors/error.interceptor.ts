import { HttpHandler, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable, throwError } from "rxjs";
import { catchError, switchMap, tap, throttleTime } from "rxjs/operators";
import { ApiError } from "src/app/definitions/interfaces/api-definitions";
import { RepositoryService } from "src/app/services/repository.service";
import { ToastService } from "src/app/services/toast.service";
import { UtilsService } from "src/app/services/utils.service";
import { AuthController } from "../api";

@Injectable()
export class ErrorInterceptor {

  private refreshTokenUrl = '/api/v1/auth/refreshToken';

  constructor(
    private authController: AuthController,
    private repositoryService: RepositoryService,
    private toastService: ToastService,
    private utilsService: UtilsService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    return next.handle(request).pipe(
      catchError(e => {
        const user = this.repositoryService.getUserData();

        if (
          e.status === HttpStatusCode.Unauthorized
          && request.url.includes(this.refreshTokenUrl)
          && request.method !== 'OPTIONS') {
            this.repositoryService.logout();
            return EMPTY;
          }
          else if (
            e.status === HttpStatusCode.Unauthorized
            && !request.url.includes(this.refreshTokenUrl)
            && request.method !== 'OPTIONS'
            ) {
              if (e.error) {
              this.showError(e.error);
            }
            if (user.accessToken) {
              this.refreshToken(user.accessToken).pipe(
                throttleTime(2000),
                switchMap(() => { return next.handle(request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${this.repositoryService.getAccessToken()}`,
                    'app-user': String(user.id),
                  }
                }))})
              );
              return EMPTY;
            } else {
              return EMPTY;
            }
          } else {
            this.showError(e.error);
            return throwError(e.error);
          }
      })
    )
  }

  private refreshToken(token: string): Observable<string> {
    return this.authController.refreshToken().pipe(
      tap((token: string) => this.repositoryService.setAccessToken(token))
    );
  }

  private showError(error: Blob) {
    if (error instanceof Blob) {
      this.utilsService.blobToJsonObject<ApiError>(error).subscribe((x) => {
        console.log(x)
        this.toastService.showError('errors.error', x.message);
      });
    }
  }

}
