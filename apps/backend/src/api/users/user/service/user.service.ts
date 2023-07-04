import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemService } from 'src/api/items/item/service/item.service';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/service/auth.service';
import { ErrorService } from '../../../../common/services/error.service';
import { UserCreateDto } from '../model/dto/user-create.dto';
import { UserGetDto } from '../model/dto/user-get.dto';
import { UserPageDto } from '../model/dto/user-page.dto';
import { UserUpdateDto } from '../model/dto/user-update.dto';
import { UserDto } from '../model/dto/user.dto';
import { User } from '../model/user.entity';
import { createReadStream } from 'fs';
import { AVATARS_PATH } from 'src/configuration/app.config';
import { UserPublicDto } from '../model/dto/user-public.dto';
import { FriendshipRequestDto } from '../model/dto/friendship-request.dto';
import { FriendshipPendingRequestDto } from '../model/dto/friendship-pending-request.dto';
import { FriendshipRespondDto } from '../model/dto/friendship-respond.dto';
import { AVATAR_MAX_SIZE } from 'src/configuration/backend.config';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private authService: AuthService,
        private itemService: ItemService,
        private errorService: ErrorService,
    ) {}

    async create(dto: UserCreateDto): Promise<UserDto> {
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

        this.itemService.createStartingItems(savedUser.id);

        return savedUser;
    }

    async update(id: string | number, dto: UserUpdateDto): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { id: +id } });
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
        const user = await this.userRepository.findOne({ where: { id: +id } });

        if (!user) this.errorService.throw('errors.userNotFound');

        return user;
    }

    async getByName(name: string): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { nickname: name }});

        if (!user) this.errorService.throw('errors.userNotFound');

        return user;
    }

    async getAll(dto: UserGetDto): Promise<UserPageDto> {
        const page = await this.userRepository.find({
            skip: dto.page * dto.limit,
            take: dto.limit,
        })
        
        const pageUser: UserPageDto = {
            data: page,
            meta: {},
        };
        return pageUser;
    }

    async updateOwnedDragons(id: number | string, increment: boolean = true) {
        const user = await this.userRepository.findOne({ where: { id: +id } });
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
        if (file.size > AVATAR_MAX_SIZE) this.errorService.throw('errors.fileTooLarge');
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

    async getPublicData(userId: number | string): Promise<UserPublicDto> {
        const user = await this.userRepository.findOne({ where: { id: +userId } });
        if (!user) this.errorService.throw('errors.userNotFound');

        const publicUser: UserPublicDto = {
            id: user.id,
            role: user.role,
            nickname: user.nickname,
            gold: user.gold,
            mutedUntil: user.mutedUntil,
            bannedUnitl: user.bannedUnitl,
        };
        return publicUser;
    }

    async requestFriendship(userId: number, dto: FriendshipRequestDto) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const targetUser = await this.userRepository.findOne({ 
            where: { id: dto.targetUserId },
            relations: ['friends', 'friendRequests'] 
        });
        if (!targetUser) this.errorService.throw('errors.userNotFound');
        if (user.id === targetUser.id) this.errorService.throw('errors.cannotInviteSelf');

        if (targetUser.friends.map((x) => x.id).includes(user.id)) this.errorService.throw('errors.alreadyFriend');
        if (targetUser.friendRequests.map((x) => x.id).includes(user.id)) this.errorService.throw('errors.alreadyFriendRequest');

        targetUser.friendRequests.push(user);
        await this.userRepository.save(targetUser);
    }

    async getPendingFriendshipRequests(userId: number): Promise<FriendshipPendingRequestDto[]> {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['friendRequests'] });
        
        return user.friendRequests.map((requester) => ({
            requesterId: requester.id,
            requesterNick: requester.nickname,
        }));
    }

    async respondToFriendshipRequest(userId: number, dto: FriendshipRespondDto): Promise<UserPublicDto> {
        const user = await this.userRepository.findOne({ 
            where: { id: userId }, 
            relations: ['friends', 'friendRequests'] 
        });
        const requester = await this.userRepository.findOne({ 
            where: { id: dto.requesterId }, 
            relations: ['friends', 'friendRequests'] 
        });
        
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
        const user = await this.userRepository.findOne({ where: { id:userId }, relations: ['friends'] });

        return user.friends.map((friend) => ({
            id: friend.id,
            nickname: friend.nickname,
            gold: friend.gold,
        }));
    }

    private async emailExists(email: string): Promise<boolean> {
        const users = await this.userRepository.find({ where: { email: email } });
        return users.length > 0;
    }

    private async nicknameExists(nickname: string): Promise<boolean> {
        const users = await this.userRepository.find({ where: { nickname: nickname }});
        return users.length > 0;
    }
}
