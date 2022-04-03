import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { UserDto } from "../user/model/dto/user.dto";
import { UserAuthDto } from "./dto/user-auth.dto";
import { UserConfirmDto } from "./dto/user-confirm.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { AuthService } from "./service/auth.service";
import { JwtAuthGuard } from "./util/jwt.guard";

@Controller('auth')
@ApiTags('AuthController')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) {}

    @Post('login')
    @ApiOkResponse({ type: UserAuthDto })
    login(@Body() dto: UserLoginDto): Promise<UserAuthDto> {
        return this.authService.login(dto);
    }

    @Post('register')
    @ApiOkResponse()
    register(@Body() dto: UserRegisterDto): Promise<void> {
        return this.authService.register(dto);
    }

    @Post('confirm')
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
}
