import { UserRole } from "src/api/users/user/model/definitions/users";

export interface UserJwt {
    id: number;
    email: string;
    nickname: string;
    role: UserRole;
}

export interface JwtData {
    user: UserJwt;
    iat: number;
    exp: number;
}
