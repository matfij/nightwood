import { UserRole } from "src/api/users/user/model/definitions/users";

export interface JwtPayload {
    id: number;
    nickname: string;
    role: UserRole;
    isRefresh?: boolean;
}
