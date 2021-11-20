import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { TranslateService } from "src/core/services/translate.service";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { AuthService } from "./service/auth.service";

@Controller('auth')
@ApiTags('AuthController')
export class AuthController {

    constructor(
        private authService: AuthService,
        private t: TranslateService
    ) {}

    @Post('login')
    @ApiOkResponse({ type: AuthResponseDto })
    login(@Body() dto: LoginUserDto): Promise<AuthResponseDto> {
        return this.authService.login(dto);
    }

    @Post('register')
    @ApiOkResponse({ type: AuthResponseDto })
    register(@Body() dto: RegisterUserDto): Promise<AuthResponseDto> {
        return this.authService.register(dto);
    }

    @Post('refreshToken')
    @ApiOkResponse({ type: String })
    refreshToken() {
        return this.t.translate('errors.tokenInvalid');
    }
}
