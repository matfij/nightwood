import { BadRequestException,Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pseudoRandomBytes } from 'crypto';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SALT_ROUNDS } from 'src/configuration/user.config';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../model/dto/create-user.dto';
import { GetUserDto } from '../model/dto/get-user.dto';
import { LoginUserDto } from '../model/dto/login-user.dto';
import { User } from '../model/user.entity';
import { IUser } from '../model/user.interface';

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async login(dto: LoginUserDto): Promise<IUser> {
        const user = await this.userRepository.findOne({ nickname: dto.nickname });
        if (!user) throw new NotFoundException();

        const match: boolean = await this.validatePassword(dto.password, user.password);
        if (!match) throw new BadRequestException('Incorrect password');

        return user;
    }

    async create(dto: CreateUserDto): Promise<IUser> {
        if (await this.emailExists(dto.email)) throw new BadRequestException('Email occupied');
        if (await this.nicknameExists(dto.nickname)) throw new BadRequestException('Nickname occupied');

        const hashedPassword = await this.hashPassword(dto.password);
        const newUser: IUser = {
            email: dto.email,
            password: hashedPassword,
            nickname: dto.nickname,
        };

        const createdUser = this.userRepository.create(newUser);
        return this.userRepository.save(createdUser);
    }

    async getOne(id: string): Promise<IUser> {
        return this.userRepository.findOne(id);
    }

    async getAll(dto: GetUserDto): Promise<Pagination<IUser>> {
        return paginate<IUser>(this.userRepository, { page: dto.page, limit: dto.limit });
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

    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, SALT_ROUNDS);
    }

    private async validatePassword(password: string, hashedPassword: string): Promise<any> {
        return bcrypt.compare(password, hashedPassword);
    }
}
