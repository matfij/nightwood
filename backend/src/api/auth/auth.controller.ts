import { Body, Controller, Post } from "@nestjs/common";
import { TranslateService } from "src/core/services/translate.service";
import { IAuthResponse } from "./dto/auth-response.interface";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { AuthService } from "./service/auth.service";

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private t: TranslateService
    ) {}

    @Post('login')
    login(@Body() dto: LoginUserDto): Promise<IAuthResponse> {
        return this.authService.login(dto);
    }

    @Post('register')
    register(@Body() dto: RegisterUserDto): Promise<IAuthResponse> {
        return this.authService.register(dto);
    }

    @Post('refreshToken')
    refreshToken() {
        return this.t.translate('errors.tokenInvalid');
    }
}
