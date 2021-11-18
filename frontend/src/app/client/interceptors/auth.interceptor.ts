import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RepositoryService } from "../../services/repository.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private repositoryService: RepositoryService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.repositoryService.getAccessToken();
    // const user = this.repositoryService.getUserData();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          // 'app-user': String(user.userId) ?? '',
        },
      });
    }
    return next.handle(request);
  }

}
