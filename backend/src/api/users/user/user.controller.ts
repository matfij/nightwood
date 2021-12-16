import { Body, Controller, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationInterceptor } from 'src/common/interceptors/pagination.interceptor';
import { JwtAuthGuard } from '../auth/util/jwt.guard';
import { CreateUserDto } from './model/dto/create-user.dto';
import { GetUserDto } from './model/dto/get-user.dto';
import { PageUserDto } from './model/dto/page-user.dto';
import { UpdateUserDto } from './model/dto/update-user.dto';
import { UserDto } from './model/dto/user.dto';
import { UserService } from './service/user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiTags('UserController')
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    @Post('create')
    @ApiOkResponse({ type: UserDto })
    create(@Body() dto: CreateUserDto): Promise<UserDto> {
        return this.userService.create(dto);
    }

    @Put('update/:id')
    @ApiOkResponse({ type: UserDto })
    update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<UserDto> {
        return this.userService.update(id, dto);
    }

    @Get('getOne/:id')
    @ApiOkResponse({ type: UserDto })
    getOne(@Param('id') id: string): Promise<UserDto> {
        return this.userService.getOne(id);
    }

    @Post('getAll')
    @UseInterceptors(PaginationInterceptor)
    @ApiOkResponse({ type: PageUserDto })
    getAll(@Body() dto: GetUserDto): Promise<PageUserDto> {
        return this.userService.getAll(dto);
    }

}    
