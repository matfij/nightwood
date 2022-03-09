import { BadRequestException,Injectable, NotFoundException } from '@nestjs/common';
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

        if (gold < 0 && user.gold < gold) this.errorService.throw('errors.insufficientsFound');
        
        user.gold += gold;
        await this.userRepository.update(userId, { gold: user.gold });

        return user;
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
