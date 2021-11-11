import { Body, Controller, Get, Post } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { CreateUserDto } from './model/dto/create-user.dto';
import { GetUserDto } from './model/dto/get-user.dto';
import { LoginUserDto } from './model/dto/login-user.dto';
import { IUser } from './model/user.interface';
import { UserService } from './service/user.service';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    @Post('login')
    login(@Body() dto: LoginUserDto): Promise<IUser> {
        return this.userService.login(dto);
    }

    @Post('create')
    create(@Body() dto: CreateUserDto): Promise<IUser> {
        return this.userService.create(dto);
    }

    @Get('getOne')
    getOne(): Promise<IUser> {
        return this.userService.getOne("");
    }

    @Get('getAll')
    getAll(@Body() dto: GetUserDto): Promise<Pagination<IUser>> {
        return this.userService.getAll(dto);
    }
}    
