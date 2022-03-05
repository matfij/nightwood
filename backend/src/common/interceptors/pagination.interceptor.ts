import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "src/configuration/backend.config";

@Injectable()
export class PaginationInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        let request = context.switchToHttp().getRequest();
        if (request.body) {
            request.body.page = request.body.page ?? DEFAULT_PAGE;
            request.body.limit = request.body.limit ?? DEFAULT_LIMIT;
        }
        return next.handle();
    }
}
