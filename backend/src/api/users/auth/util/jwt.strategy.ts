import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserJwt } from "../model/definitions/jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        configService: ConfigService
    ) {
        super({
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_KEY'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: any): Promise<UserJwt> {
        return { ...payload.jwtData };
    }
}
