import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateUserDto } from './model/dto/create-user.dto';
import { LoginUserDto } from './model/dto/login-user.dto';
import { IUser } from './model/user.interface';
import { UserService } from './service/user.service';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    @Post('login')
    login(@Body() dto: LoginUserDto): Observable<IUser> {
        return true as any;
    }

    @Post('create')
    create(@Body() dto: CreateUserDto): Observable<IUser> {
        return true as any;
    }

    @Get('getOne')
    getOne(): Observable<IUser> {
        return true as any;
    }

    @Get('getAll')
    getAll(): Observable<IUser[]> {
        return true as any;
    }
}    
