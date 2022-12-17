import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { AUTH_REQUEST_LIMIT, AUTH_REQUEST_TTL } from "src/configuration/app.config";
import { UserDto } from "../user/model/dto/user.dto";
import { PasswordRecoverDto } from "./model/dto/password-recover.dto";
import { UserAuthDto } from "./model/dto/user-auth.dto";
import { UserConfirmDto } from "./model/dto/user-confirm.dto";
import { UserLoginDto } from "./model/dto/user-login.dto";
import { UserRegisterDto } from "./model/dto/user-register.dto";
import { AuthService } from "./service/auth.service";
import { JwtAuthGuard } from "./util/jwt.guard";

@Controller('auth')
@ApiTags('AuthController')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) {}

    @Post('login')
    @Throttle(AUTH_REQUEST_LIMIT, AUTH_REQUEST_TTL)
    @ApiOkResponse({ type: UserAuthDto })
    login(@Body() dto: UserLoginDto): Promise<UserAuthDto> {
        return this.authService.login(dto);
    }

    @Post('register')
    @Throttle(AUTH_REQUEST_LIMIT, AUTH_REQUEST_TTL)
    @ApiOkResponse()
    register(@Body() dto: UserRegisterDto): Promise<void> {
        return this.authService.register(dto);
    }

    @Post('confirm')
    @Throttle(AUTH_REQUEST_LIMIT, AUTH_REQUEST_TTL)
    @ApiOkResponse()
    confirm(@Body() dto: UserConfirmDto): Promise<void> {
        return this.authService.confirm(dto);
    }

    @Post('refreshToken')
    @ApiOkResponse({ type: UserAuthDto })
    refreshToken(@Body() dto: UserAuthDto): Promise<UserAuthDto> {
        return this.authService.refreshToken(dto);
    }

    @Post('getUser')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: UserAuthDto })
    getUserData(@Request() req: AuthorizedRequest): Promise<UserDto> {
        return this.authService.getUserData(+req.user.id);
    }

    @Post('recoverPassword')
    @ApiOkResponse()
    recoverPassword(@Body() dto: PasswordRecoverDto): Promise<void> {
        return this.authService.recoverPassword(dto);
    }
}
