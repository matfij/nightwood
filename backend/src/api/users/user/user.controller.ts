import { Body, Request, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, StreamableFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthorizedRequest } from 'src/common/definitions/requests';
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

    @Post('setAvatar')
    @UseInterceptors(FileInterceptor('avatar'))
    setAvatar(@Request() req: AuthorizedRequest, @UploadedFile() file:  Express.Multer.File): Promise<void> {
        return this.userService.setAvatar(req.user.id, file);
    }

    @Post('getAvatar')
    getAvatar(@Request() req: AuthorizedRequest): StreamableFile {
        const avatar = createReadStream(`uploads/${req.user.id}.png`);
        return new StreamableFile(avatar);
    }

}    
