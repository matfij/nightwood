import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginatedResponse } from 'src/common/decorators/paginated-response';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/configuration/user.config';
import { JwtAuthGuard } from '../auth/util/jwt.guard';
import { CreateUserDto } from './model/dto/create-user.dto';
import { GetUserDto } from './model/dto/get-user.dto';
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

    @Get('getAll')
    @PaginatedResponse(UserDto)
    getAll(@Body() dto: GetUserDto): Promise<Pagination<UserDto>> {
        // todo - add default pagination middleware
        dto.page = dto.page ?? DEFAULT_PAGE;
        dto.limit = dto.limit ?? DEFAULT_LIMIT;

        return this.userService.getAll(dto);
    }
}    
