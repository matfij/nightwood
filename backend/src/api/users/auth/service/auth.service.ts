import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/model/user.entity';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { GetUserDto } from '../../user/model/dto/get-user.dto';
import { AuthUserDto } from '../dto/auth-user.dto';
import { UserDto } from '../../user/model/dto/user.dto';
import { ItemService } from 'src/api/items/item/service/item.service';
import { ErrorService } from '../../../../common/services/error.service';
import { JwtData } from '../dto/jwt-user';
import { DateService } from 'src/common/services/date.service';
import { EmailService } from 'src/common/services/email.service';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private itemService: ItemService,
        private errorService: ErrorService,
        private dateService: DateService,
        private emailService: EmailService,
    ) {}

    async login(dto: LoginUserDto): Promise<AuthUserDto> {
        const user = await this.userRepository.findOne({ nickname: dto.nickname });
        if (!user) this.errorService.throw('errors.loginNotFound');

        const match: boolean = await this.validatePassword(dto.password, user.password);
        if (!match) this.errorService.throw('errors.passwordIncorrect');

        const token = await this.generateJwt(user);
        return {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            accessToken: token,
            gold: user.gold,
        };
    }

    async register(dto: RegisterUserDto): Promise<AuthUserDto> {
        if (await this.emailExists(dto.email)) this.errorService.throw('errors.emailNotUnique');
        if (await this.nicknameExists(dto.nickname)) this.errorService.throw('errors.nicknameNotUnique');

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
            gold: createdUser.gold,
        };
    }

    async refreshToken(dto: AuthUserDto) {
        const userData = this.jwtService.decode(dto.accessToken) as JwtData;
        if (!this.dateService.isTokenValid(userData.exp, 1500)) this.errorService.throw('errors.tokenInvalid');

        dto.accessToken = null;
        dto.accessToken = await this.generateJwt(dto);

        return dto;
    }

    async getUser(accessToken: string): Promise<UserDto> {
        try { this.jwtService.verify(accessToken) } catch (_) { return null; };

        const decodedToken = this.jwtService.decode(accessToken);

        return decodedToken['user'];
    }

    async getUserData(userId: number): Promise<UserDto> {
        const user = await this.userRepository.findOne(userId);
        user.password = null;
        return user;
    }

    async generateJwt(user: UserDto): Promise<string> {
        user.password = '';
        return this.jwtService.signAsync({user});
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
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
