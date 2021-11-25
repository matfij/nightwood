import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthUserDto } from "./dto/auth-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { AuthService } from "./service/auth.service";

@Controller('auth')
@ApiTags('AuthController')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) {}

    @Post('login')
    @ApiOkResponse({ type: AuthUserDto })
    login(@Body() dto: LoginUserDto): Promise<AuthUserDto> {
        return this.authService.login(dto);
    }

    @Post('register')
    @ApiOkResponse({ type: AuthUserDto })
    register(@Body() dto: RegisterUserDto): Promise<AuthUserDto> {
        return this.authService.register(dto);
    }

    @Post('refreshToken')
    @ApiOkResponse({ type: AuthUserDto })
    refreshToken(@Body() dto: AuthUserDto): Promise<AuthUserDto> {
        return this.authService.refreshToken(dto);
    }
}
