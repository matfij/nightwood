import { HttpHandler, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { EMPTY, Observable, throwError } from "rxjs";
import { catchError, map, switchMap, tap, throttleTime } from "rxjs/operators";
import { RepositoryService } from "src/app/common/services/repository.service";
import { ToastService } from "src/app/common/services/toast.service";
import { UtilsService } from "src/app/common/services/utils.service";
import { AuthController, UserAuthDto } from "../api";

@Injectable()
export class ErrorInterceptor {

  private refreshTokenUrl = '/api/v1/auth/refreshToken';

  constructor(
    private translateService: TranslateService,
    private authController: AuthController,
    private repositoryService: RepositoryService,
    private toastService: ToastService,
    private utilsService: UtilsService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError(e => {
        const user = this.repositoryService.getUserData();
        if (user) user.accessToken = user ? this.repositoryService.getAccessToken() : '';

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
            if (user && user.accessToken) {
              return this.refreshToken(user).pipe(
                throttleTime(2000),
                switchMap(() => { return next.handle(request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${this.repositoryService.getAccessToken()}`,
                    'app-user': String(user.id),
                  }
                }))})
              );
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

  private refreshToken(user: UserAuthDto): Observable<string> {
    const ob$ = this.authController.refreshToken(user).pipe(
      tap((user: UserAuthDto) => this.repositoryService.setAccessToken(user.accessToken)),
      map((user: UserAuthDto) => user.accessToken),
    );
    ob$.subscribe(() => {}, () => this.repositoryService.logout());
    return ob$;
  }

  private showError(error: Blob) {
    if (error instanceof Blob) {
      this.utilsService.blobToJsonObject<any>(error).subscribe((res) => {
        if (res.message) {
          if (typeof res.message === 'string') {
            const message = this.translateService.instant(res.message);
            this.toastService.showError('errors.error', message);
          } else {
            try {
              const message = this.translateService.instant(res.message[0]);
              this.toastService.showError('errors.error', message);
            } catch (_) {
              this.toastService.showError('errors.error', 'errors.unknown');
            }
          }
        }
      });
    }
  }

}
