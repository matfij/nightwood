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

export interface JwtPayload {
    id: number;
    nickname: string;
    role: UserRole;
    isRefresh?: boolean;
}
