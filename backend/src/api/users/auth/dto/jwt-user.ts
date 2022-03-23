export interface JwtUser {
    id: number;
    email: string;
    nickname: string;
}

export interface JwtData {
    user: JwtUser;
    iat: number;
    exp: number;
}
