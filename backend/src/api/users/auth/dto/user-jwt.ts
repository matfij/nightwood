export interface UserJwt {
    id: number;
    email: string;
    nickname: string;
}

export interface JwtData {
    user: UserJwt;
    iat: number;
    exp: number;
}
