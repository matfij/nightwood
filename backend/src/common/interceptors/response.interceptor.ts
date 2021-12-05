import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // unify response format (http status code) for generated client
    context.switchToHttp().getResponse().status(HttpStatus.OK);
    return next.handle();
  }
}
