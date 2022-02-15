import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { UserDto } from "../user/model/dto/user.dto";
import { AuthUserDto } from "./dto/auth-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { AuthService } from "./service/auth.service";
import { JwtAuthGuard } from "./util/jwt.guard";

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

    @Post('getUser')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: AuthUserDto })
    getUserData(@Request() req: AuthorizedRequest): Promise<UserDto> {
        return this.authService.getUserData(+req.user.id);
    }
}
