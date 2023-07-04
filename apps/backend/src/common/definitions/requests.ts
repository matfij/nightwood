import { JwtPayload } from "src/api/users/auth/model/definitions/jwt";

export interface AuthorizedRequest {
    user: JwtPayload;
}
