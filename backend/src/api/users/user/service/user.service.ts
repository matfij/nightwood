import { BadRequestException,Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/service/auth.service';
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
    ) {}

    async create(dto: CreateUserDto): Promise<UserDto> {
        if (await this.emailExists(dto.email)) throw new BadRequestException('Email occupied');
        if (await this.nicknameExists(dto.nickname)) throw new BadRequestException('Nickname occupied');

        const hashedPassword = await this.authService.hashPassword(dto.password);
        const newUser: UserDto = {
            email: dto.email,
            password: hashedPassword,
            nickname: dto.nickname,
        };

        const createdUser = this.userRepository.create(newUser);
        return this.userRepository.save(createdUser);
    }

    async update(id: string | number, dto: UpdateUserDto): Promise<UserDto> {
        const user = await this.userRepository.findOne(id);
        if (!user) throw new NotFoundException();

        if (dto.email && dto.email !== user.email && await this.emailExists(dto.email))
            throw new BadRequestException('Email occupied');
        if (dto.nickname && dto.nickname !== user.nickname && await this.nicknameExists(dto.nickname))
            throw new BadRequestException('Nickname occupied');

        if (dto.email) user.email = dto.email;
        if (dto.nickname) user.nickname = dto.nickname;
        if (dto.password) user.password = await this.authService.hashPassword(user.password);
        if (dto.ownedDragons) user.ownedDragons = dto.ownedDragons;
        if (dto.maxOwnedDragons) user.maxOwnedDragons = dto.ownedDragons;

        return this.userRepository.save(user);
    }

    async getOne(id: string): Promise<UserDto> {
        return this.userRepository.findOne(id);
    }

    async getAll(dto: GetUserDto): Promise<PageUserDto> {
        const page = await paginate<UserDto>(this.userRepository, { page: dto.page, limit: dto.limit });
        
        const pageUser: PageUserDto = {
            data: page.items,
            meta: page.meta,
        };
        return pageUser;
    }

    async incrementOwnedDragons(id: number | string) {
        const user = await this.userRepository.findOne(id);
        if (!user) throw new NotFoundException();
        
        if (user.ownedDragons >= user.maxOwnedDragons) throw new BadRequestException('Max number of dragons exceeded');
        user.ownedDragons += 1;

        return this.userRepository.save(user);
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
