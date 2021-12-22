import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/model/user.entity';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { GetUserDto } from '../../user/model/dto/get-user.dto';
import { AuthUserDto } from '../dto/auth-user.dto';
import { SALT_ROUNDS } from 'src/configuration/user.config';
import { UserDto } from '../../user/model/dto/user.dto';
import { ItemService } from 'src/api/items/item/service/item.service';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private itemService: ItemService, 
    ) {}

    async login(dto: LoginUserDto): Promise<AuthUserDto> {
        const user = await this.userRepository.findOne({ nickname: dto.nickname });
        if (!user) throw new NotFoundException();

        const match: boolean = await this.validatePassword(dto.password, user.password);
        if (!match) throw new BadRequestException('Incorrect password');

        const token = await this.generateJwt(user);
        return {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            accessToken: token,
        };
    }

    async register(dto: RegisterUserDto): Promise<AuthUserDto> {
        if (await this.emailExists(dto.email)) throw new BadRequestException('Email occupied');
        if (await this.nicknameExists(dto.nickname)) throw new BadRequestException('Nickname occupied');

        const hashedPassword = await this.hashPassword(dto.password);
        const newUser: UserDto = {
            email: dto.email,
            password: hashedPassword,
            nickname: dto.nickname,
        };

        const createdUser = this.userRepository.create(newUser);
        const savedUser = await this.userRepository.save(createdUser);

        this.itemService.createStartingItems(savedUser);

        const token = await this.generateJwt(createdUser);
        return {
            id: savedUser.id,
            email: createdUser.email,
            nickname: createdUser.nickname,
            accessToken: token,
        };
    }

    async refreshToken(dto: AuthUserDto) {
        try { this.jwtService.verify(dto.accessToken) } catch (_) { throw new BadRequestException('Incorrect token') };

        dto.accessToken = await this.generateJwt(dto);

        return dto;
    }

    async generateJwt(user: UserDto): Promise<string> {
        return this.jwtService.signAsync({ user });
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, SALT_ROUNDS);
    }

    async validatePassword(password: string, hashedPassword: string): Promise<any> {
        return bcrypt.compare(password, hashedPassword);
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
