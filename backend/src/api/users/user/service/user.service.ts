import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { ItemService } from 'src/api/items/item/service/item.service';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/service/auth.service';
import { ErrorService } from '../../../../common/services/error.service';
import { CreateUserDto } from '../model/dto/create-user.dto';
import { GetUserDto } from '../model/dto/get-user.dto';
import { PageUserDto } from '../model/dto/page-user.dto';
import { UpdateUserDto } from '../model/dto/update-user.dto';
import { UserDto } from '../model/dto/user.dto';
import { User } from '../model/user.entity';
import { createReadStream } from 'fs';
import { AVATARS_PATH } from 'src/configuration/app.config';
import { UserPublicDto } from '../model/dto/user-public.dto';
import { FriendshipRequestDto } from '../model/dto/friendship-request.dto';
import { FriendshipPendingRequestDto } from '../model/dto/friendship-pending-request.dto';
import { FriendshipRespondDto } from '../model/dto/friendship-respond.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private authService: AuthService,
        private itemService: ItemService,
        private errorService: ErrorService,
    ) {}

    async create(dto: CreateUserDto): Promise<UserDto> {
        if (await this.emailExists(dto.email)) this.errorService.throw('errors.emailNotUnique');
        if (await this.nicknameExists(dto.nickname)) this.errorService.throw('errors.nicknameNotUnique');

        const hashedPassword = await this.authService.hashPassword(dto.password);
        const newUser: UserDto = {
            email: dto.email,
            password: hashedPassword,
            nickname: dto.nickname,
        };

        const createdUser = this.userRepository.create(newUser);
        const savedUser = await this.userRepository.save(createdUser);

        this.itemService.createStartingItems(savedUser);

        return savedUser;
    }

    async update(id: string | number, dto: UpdateUserDto): Promise<UserDto> {
        const user = await this.userRepository.findOne(id);
        if (!user) throw new NotFoundException();

        if (dto.email && dto.email !== user.email && await this.emailExists(dto.email)) this.errorService.throw('errors.emailNotUnique');
        if (dto.nickname && dto.nickname !== user.nickname && await this.nicknameExists(dto.nickname)) this.errorService.throw('errors.nicknameNotUnique');

        if (dto.email) user.email = dto.email;
        if (dto.nickname) user.nickname = dto.nickname;
        if (dto.password) user.password = await this.authService.hashPassword(user.password);
        if (dto.ownedDragons) user.ownedDragons = dto.ownedDragons;
        if (dto.maxOwnedDragons) user.maxOwnedDragons = dto.ownedDragons;

        return this.userRepository.save(user);
    }

    async getOne(id: number | string): Promise<UserDto> {
        const user = await this.userRepository.findOne(id);

        if (!user) this.errorService.throw('errors.userNotFound');

        return user;
    }

    async getByName(name: string): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { nickname: name }});

        if (!user) this.errorService.throw('errors.userNotFound');

        return user;
    }

    async getAll(dto: GetUserDto): Promise<PageUserDto> {
        const page = await paginate<UserDto>(this.userRepository, { page: dto.page, limit: dto.limit });
        
        const pageUser: PageUserDto = {
            data: page.items,
            meta: page.meta,
        };
        return pageUser;
    }

    async updateOwnedDragons(id: number | string, increment: boolean = true) {
        const user = await this.userRepository.findOne(id);
        if (!user) throw new NotFoundException();
        
        if (increment && user.ownedDragons >= user.maxOwnedDragons) this.errorService.throw('errors.maxDragonsExceeded');
        increment ? user.ownedDragons += 1 : user.ownedDragons -= 1;

        return this.userRepository.save(user);
    }

    async updateGold(userId: number, gold: number): Promise<UserDto> {
        const user = await this.getOne(userId);

        if (gold < 0 && user.gold < Math.abs(gold)) this.errorService.throw('errors.insufficientsFound');
        
        user.gold += gold;
        await this.userRepository.update(userId, { gold: user.gold });

        return user;
    }

    async extendDragonLimit(userId: number): Promise<UserDto> {
        const user = await this.getOne(userId);

        user.maxOwnedDragons += 1;
        await this.userRepository.update(userId, { maxOwnedDragons: user.maxOwnedDragons });

        return user;
    }

    async setAvatar(userId: number, file: Express.Multer.File) {
        if (file.size > 100 * 1000) this.errorService.throw('errors.fileTooLarge');
        if (!['image/jpeg', 'image/png'].includes(file.mimetype)) this.errorService.throw('errors.avatarIncorrectFormat');

        const path = `${AVATARS_PATH}/${userId}.png`;
        
        const fs = require('fs')
        if (!fs.existsSync(AVATARS_PATH)) fs.mkdirSync(AVATARS_PATH, { recursive: true });
        fs.writeFile(path, file.buffer, () => {});
    }

    async getAvatar(userId: number): Promise<StreamableFile | void> {
        const fs = require('fs');
        const path = `${AVATARS_PATH}/${userId}.png`;

        try {
            if (fs.existsSync(path)) {
                const avatar = createReadStream(path);
                return new StreamableFile(avatar);
            }
            return null;
        } catch(err) {
            return null;
        }
    }

    async getPublicData(id: number | string): Promise<UserPublicDto> {
        const user = await this.userRepository.findOne(id);
        if (!user) this.errorService.throw('errors.userNotFound');

        const publicUser: UserPublicDto = {
            id: user.id,
            nickname: user.nickname,
            gold: user.gold,
        };
        return publicUser;
    }

    async requestFriendship(userId: number, dto: FriendshipRequestDto) {
        const user = await this.userRepository.findOne(userId);

        const targetUser = await this.userRepository.findOne(dto.targetUserId, { relations: ['friends', 'friendRequests'] });
        if (!targetUser) this.errorService.throw('errors.userNotFound');
        if (user.id === targetUser.id) this.errorService.throw('errors.cannotInviteSelf');

        if (targetUser.friends.map((x) => x.id).includes(user.id)) this.errorService.throw('errors.alreadyFriend');
        if (targetUser.friendRequests.map((x) => x.id).includes(user.id)) this.errorService.throw('errors.alreadyFriendRequest');

        targetUser.friendRequests.push(user);
        await this.userRepository.save(targetUser);
    }

    async getPendingFriendshipRequests(userId: number): Promise<FriendshipPendingRequestDto[]> {
        const user = await this.userRepository.findOne(userId, { relations: ['friendRequests'] });
        
        return user.friendRequests.map((requester) => ({
            requesterId: requester.id,
            requesterNick: requester.nickname,
        }));
    }

    async respondToFriendshipRequest(userId: number, dto: FriendshipRespondDto): Promise<UserPublicDto> {
        const user = await this.userRepository.findOne(userId, { relations: ['friends', 'friendRequests'] });
        const requester = await this.userRepository.findOne(dto.requesterId, { relations: ['friends', 'friendRequests'] });
        
        if (!user.friendRequests.map((x) => x.id).includes(requester.id)) this.errorService.throw('errors.friendRequestNotFound');

        const requestInd = user.friendRequests.findIndex((x) => x.id === requester.id);
        user.friendRequests.splice(requestInd);

        if (dto.accept) {
            user.friends.push(requester);
            requester.friends.push(user);
        }

        await this.userRepository.save(user);
        await this.userRepository.save(requester);

        const requesterPublic: UserPublicDto = {
            id: requester.id,
            nickname: requester.nickname,
            gold: requester.gold,
        };
        return requesterPublic;
    }

    async getFriends(userId: number): Promise<UserPublicDto[]> {
        const user = await this.userRepository.findOne(userId, { relations: ['friends'] });

        return user.friends.map((friend) => ({
            id: friend.id,
            nickname: friend.nickname,
            gold: friend.gold,
        }));
    }

    private async emailExists(email: string): Promise<boolean> {
        const params: GetUserDto = { email: email };
        const users = await this.userRepository.find(params);

        return users.length > 0;
    }

    private async nicknameExists(nickname: string): Promise<boolean> {
        const params: GetUserDto = { nickname: nickname };
        const users = await this.userRepository.find(params);

        return users.length > 0;
    }
}
