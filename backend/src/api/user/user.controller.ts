import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/configuration/user.config';
import { JwtAuthGuard } from '../auth/util/jwt.guard';
import { CreateUserDto } from './model/dto/create-user.dto';
import { GetUserDto } from './model/dto/get-user.dto';
import { UpdateUserDto } from './model/dto/update-user.dto';
import { IUser } from './model/user.interface';
import { UserService } from './service/user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    @Post('create')
    create(@Body() dto: CreateUserDto): Promise<IUser> {
        return this.userService.create(dto);
    }

    @Put('update/:id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<IUser> {
        return this.userService.update(id, dto);
    }

    @Get('getOne/:id')
    getOne(@Param('id') id: string): Promise<IUser> {
        return this.userService.getOne(id);
    }

    @Get('getAll')
    getAll(@Body() dto: GetUserDto): Promise<Pagination<IUser>> {
        // todo - add default pagination middleware
        dto.page = dto.page ?? DEFAULT_PAGE;
        dto.limit = dto.limit ?? DEFAULT_LIMIT;

        return this.userService.getAll(dto);
    }
}    
