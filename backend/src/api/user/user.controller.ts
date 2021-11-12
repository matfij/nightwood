import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/configuration/user.config';
import { JwtAuthGuard } from '../auth/util/jwt.guard';
import { CreateUserDto } from './model/dto/create-user.dto';
import { GetUserDto } from './model/dto/get-user.dto';
import { ILoginResponse } from './model/dto/login-response.interface';
import { LoginUserDto } from './model/dto/login-user.dto';
import { IUser } from './model/user.interface';
import { UserService } from './service/user.service';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    @Post('login')
    login(@Body() dto: LoginUserDto): Promise<ILoginResponse> {
        return this.userService.login(dto);
    }

    @Post('create')
    create(@Body() dto: CreateUserDto): Promise<IUser> {
        return this.userService.create(dto);
    }

    @Get('getOne')
    @UseGuards(JwtAuthGuard)
    getOne(): Promise<IUser> {
        return this.userService.getOne("");
    }

    @Get('getAll')
    @UseGuards(JwtAuthGuard)
    getAll(@Body() dto: GetUserDto): Promise<Pagination<IUser>> {
        dto.page = dto.page ?? DEFAULT_PAGE;
        dto.limit = dto.limit ?? DEFAULT_LIMIT;

        return this.userService.getAll(dto);
    }
}    
