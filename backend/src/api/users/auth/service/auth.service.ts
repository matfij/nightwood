import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/model/user.entity';
import { UserLoginDto } from '../model/dto/user-login.dto';
import { UserRegisterDto } from '../model/dto/user-register.dto';
import { UserAuthDto } from '../model/dto/user-auth.dto';
import { UserDto } from '../../user/model/dto/user.dto';
import { ItemService } from 'src/api/items/item/service/item.service';
import { ErrorService } from '../../../../common/services/error.service';
import { JwtData, UserJwt } from '../model/definitions/jwt';
import { DateService } from 'src/common/services/date.service';
import { EmailService } from 'src/common/services/email.service';
import { EmailReplaceToken, EmailType } from 'src/common/definitions/emails';
import { UserConfirmDto } from '../model/dto/user-confirm.dto';
import { AchievementsService } from '../../achievements/service/achievements.service';
import { JWT_REFRESH_VALIDITY } from 'src/configuration/app.config';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private achievementsService: AchievementsService,
        private jwtService: JwtService,
        private itemService: ItemService,
        private errorService: ErrorService,
        private dateService: DateService,
        private emailService: EmailService,
    ) {}

    async login(dto: UserLoginDto): Promise<UserAuthDto> {
        const user = await this.userRepository.findOne({ nickname: dto.nickname });
        if (!user) this.errorService.throw('errors.loginNotFound');
        if (!user.isConfirmed) this.errorService.throw('errors.userNotConfirmed');

        const match: boolean = await this.validatePassword(dto.password, user.password);
        if (!match) this.errorService.throw('errors.passwordIncorrect');

        if (!this.dateService.checkIfNextEventAvailable(user.bannedUnitl)) this.errorService.throw('errors.userBanned');

        const token = await this.generateJwt(user);
        return {
            id: user.id,
            nickname: user.nickname,
            accessToken: token,
            gold: user.gold,
        };
    }

    async register(dto: UserRegisterDto): Promise<void> {
        if (await this.emailExists(dto.email)) this.errorService.throw('errors.emailNotUnique');
        if (await this.nicknameExists(dto.nickname)) this.errorService.throw('errors.nicknameNotUnique');

        const hashedPassword = await this.hashPassword(dto.password);

        const confirmationCode = this.generateActionToken();

        const newUser: UserDto = {
            email: dto.email,
            password: hashedPassword,
            nickname: dto.nickname,
            actionToken: confirmationCode,
            actionTokenValidity: this.dateService.getFutureDate(0, 1)
        };
        
        const createdUser = this.userRepository.create(newUser);
        createdUser.achievements = await this.achievementsService.createAchievements();
        await this.userRepository.save(createdUser);

        const emailData: EmailReplaceToken[] = [
            { token: '$user_name', value: dto.nickname },
            { token: '$activation_code_1', value: confirmationCode },
            { token: '$activation_code_2', value: confirmationCode },
        ];
        this.emailService.sendEmail(dto.email, EmailType.Activation, emailData);
    }

    async confirm(dto: UserConfirmDto): Promise<void> {
        const user = await this.userRepository.findOne({ isConfirmed: false, actionToken: dto.activationCode });
        if (!user) this.errorService.throw('errors.confirmationCodeInvalid');
        if (this.dateService.checkIfNextEventAvailable(user.actionTokenValidity)) this.errorService.throw('errors.confirmationCodeExpired');

        user.isConfirmed = true;
        this.userRepository.save(user);

        this.itemService.createStartingItems(user);
    }

    async refreshToken(dto: UserAuthDto) {
        const userData = this.jwtService.decode(dto.accessToken) as JwtData;
        if (!this.dateService.isTokenValid(userData.exp, JWT_REFRESH_VALIDITY)) this.errorService.throw('errors.tokenInvalid');

        dto.accessToken = null;
        dto.accessToken = await this.generateJwt(dto);

        return dto;
    }

    async getUserFromToken(accessToken: string): Promise<UserDto> {
        try { this.jwtService.verify(accessToken) } catch (_) { return null; };
        const decodedToken = this.jwtService.decode(accessToken);
        return decodedToken['jwtData'];
    }

    async getUserData(userId: number): Promise<UserDto> {
        const user = await this.userRepository.findOne(userId);
        user.password = null;
        return user;
    }

    async generateJwt(user: Partial<UserDto>): Promise<string> {
        const jwtData: UserJwt = {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            role: user.role
        };
        return this.jwtService.signAsync({jwtData});
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    async validatePassword(password: string, hashedPassword: string): Promise<any> {
        return bcrypt.compare(password, hashedPassword);
    }

    private async emailExists(email: string): Promise<boolean> {
        const users = await this.userRepository.find({ email: email });

        return users.length > 0;
    }

    private async nicknameExists(nickname: string): Promise<boolean> {
        const users = await this.userRepository.find({ nickname: nickname });

        return users.length > 0;
    }

    private generateActionToken(): string {
        return Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
    }
}
