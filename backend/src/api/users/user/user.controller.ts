import { Body, Request, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, StreamableFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthorizedRequest } from 'src/common/definitions/requests';
import { PaginationInterceptor } from 'src/common/interceptors/pagination.interceptor';
import { JwtAuthGuard } from '../auth/util/jwt.guard';
import { Roles } from '../auth/util/roles.decorator';
import { RolesGuard } from '../auth/util/roles.guard';
import { UserRole } from './model/definitions/users';
import { UserCreateDto } from './model/dto/user-create.dto';
import { FriendshipPendingRequestDto } from './model/dto/friendship-pending-request.dto';
import { FriendshipRequestDto } from './model/dto/friendship-request.dto';
import { FriendshipRespondDto } from './model/dto/friendship-respond.dto';
import { UserGetDto } from './model/dto/user-get.dto';
import { UserPageDto } from './model/dto/user-page.dto';
import { UserUpdateDto } from './model/dto/user-update.dto';
import { UserPublicDto } from './model/dto/user-public.dto';
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
    @UseGuards(RolesGuard)
    @Roles(UserRole.Administrator)
    @ApiOkResponse({ type: UserDto })
    create(@Body() dto: UserCreateDto): Promise<UserDto> {
        return this.userService.create(dto);
    }

    @Put('update/:id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.Administrator)
    @ApiOkResponse({ type: UserDto })
    update(@Param('id') id: string, @Body() dto: UserUpdateDto): Promise<UserDto> {
        return this.userService.update(id, dto);
    }

    @Get('getOne/:id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.Administrator)
    @ApiOkResponse({ type: UserDto })
    getOne(@Param('id') id: string): Promise<UserDto> {
        return this.userService.getOne(id);
    }

    @Post('getAll')
    @UseGuards(RolesGuard)
    @Roles(UserRole.Administrator)
    @UseInterceptors(PaginationInterceptor)
    @ApiOkResponse({ type: UserPageDto })
    getAll(@Body() dto: UserGetDto): Promise<UserPageDto> {
        return this.userService.getAll(dto);
    }

    @Post('setAvatar')
    @UseInterceptors(FileInterceptor('avatar'))
    setAvatar(@Request() req: AuthorizedRequest, @UploadedFile() file: Express.Multer.File): Promise<void> {
        return this.userService.setAvatar(req.user.id, file);
    }
    
    @Post('getAvatar')
    getAvatar(@Request() req: AuthorizedRequest): Promise<StreamableFile | void> {
        return this.userService.getAvatar(req.user.id);
    }
    
    @Get('getAvatarPublic/:id')
    getAvatarPublic(@Request() req: AuthorizedRequest, @Param('id') id: string): Promise<StreamableFile | void> {
        return this.userService.getAvatar(+id);
    }

    @Get('getPublicData/:id')
    @ApiOkResponse({ type: UserPublicDto })
    getPublicData(@Param('id') id: string): Promise<UserPublicDto> {
        return this.userService.getPublicData(id);
    }

    @Post('requestFriendship')
    @ApiOkResponse()
    requestFriendship(@Request() req: AuthorizedRequest, @Body() dto: FriendshipRequestDto): Promise<void> {
        return this.userService.requestFriendship(req.user.id, dto);
    }

    @Post('getPendingFriendshipRequests')
    @ApiOkResponse({ type: [FriendshipPendingRequestDto] })
    getPendingFriendshipRequests(@Request() req: AuthorizedRequest): Promise<FriendshipPendingRequestDto[]> {
        return this.userService.getPendingFriendshipRequests(req.user.id);
    }

    @Post('respondToFriendshipRequest')
    @ApiOkResponse({ type: UserPublicDto })
    respondToFriendshipRequest(@Request() req: AuthorizedRequest, @Body() dto: FriendshipRespondDto): Promise<UserPublicDto> {
        return this.userService.respondToFriendshipRequest(req.user.id, dto);
    }

    @Post('getFriends')
    @ApiOkResponse({ type: [UserPublicDto] })
    getFriends(@Request() req: AuthorizedRequest): Promise<UserPublicDto[]> {
        return this.userService.getFriends(req.user.id);
    }

    @Get('getFriendsPublic/:id')
    @ApiOkResponse({ type: [UserPublicDto] })
    getFriendsPublic(@Param('id') id: string): Promise<UserPublicDto[]> {
        return this.userService.getFriends(+id);
    }

}    
