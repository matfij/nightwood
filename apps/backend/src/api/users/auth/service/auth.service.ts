import { Injectable, UnauthorizedException } from '@nestjs/common';
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
import { JwtPayload } from '../model/definitions/jwt';
import { DateService } from 'src/common/services/date.service';
import { EmailService } from 'src/common/services/email.service';
import { EmailReplaceToken, EmailType } from 'src/common/definitions/emails';
import { UserConfirmDto } from '../model/dto/user-confirm.dto';
import { AchievementsService } from '../../achievements/service/achievements.service';
import { JWT_ACCESS_VALIDITY, JWT_REFRESH_VALIDITY } from 'src/configuration/app.config';
import { PasswordRecoverDto } from '../model/dto/password-recover.dto';
import { PasswordResetDto } from '../model/dto/password-reset.dto';

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
        const user = await this.userRepository.findOne({ where: { nickname: dto.nickname } });
        if (!user) this.errorService.throw('errors.userNotFound');
        if (!user.isConfirmed) this.errorService.throw('errors.userNotConfirmed');

        const match: boolean = await this.validatePassword(dto.password, user.password);
        if (!match) this.errorService.throw('errors.passwordIncorrect');

        if (!this.dateService.checkIfNextEventAvailable(user.bannedUnitl)) this.errorService.throw('errors.userBanned');

        const [accessToken, refreshToken] = await this.generateTokens({
            id: user.id,
            nickname: user.nickname,
            role: user.role,
        });
        return {
            id: user.id,
            nickname: user.nickname,
            accessToken: accessToken,
            refreshToken: refreshToken,
            gold: user.gold,
            eter: user.eter,
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
            actionTokenValidity: this.dateService.getFutureDate(0, 1),
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
        const user = await this.userRepository.findOne({ where: { isConfirmed: false, actionToken: dto.activationCode } });
        if (!user) this.errorService.throw('errors.confirmationCodeInvalid');
        if (this.dateService.checkIfNextEventAvailable(user.actionTokenValidity)) this.errorService.throw('errors.confirmationCodeExpired');

        user.isConfirmed = true;
        this.userRepository.save(user);

        this.itemService.createStartingItems(user.id);
    }

    async refreshToken(dto: UserAuthDto): Promise<UserAuthDto> {
        try {
            const payload = await this.jwtService.verifyAsync<JwtPayload>(dto.refreshToken);
            const [accessToken] = await this.generateTokens({
                id: payload.id,
                nickname: payload.nickname,
                role: payload.role,
            });
            return {
                ...dto,
                accessToken: accessToken,
            };
        } catch (err) {
            throw new UnauthorizedException();
        }
    }

    async getUserFromToken(accessToken: string): Promise<JwtPayload> {
        try {
            const payload = await this.jwtService.verifyAsync<JwtPayload>(accessToken);
            return payload;
        } catch (err) {
            throw new UnauthorizedException();
        };
    }

    async getUserData(userId: number): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        user.password = null;
        return user;
    }

    async generateTokens(payload: JwtPayload): Promise<[string, string]> {
        const accessToken = await this.jwtService.signAsync(
            { ...payload, isRefresh: false }, 
            { expiresIn: JWT_ACCESS_VALIDITY}
        );
        const refeshToken = await this.jwtService.signAsync(
            { ...payload, isRefresh: true },
            { expiresIn: JWT_REFRESH_VALIDITY },
        );
        return [accessToken, refeshToken];
    }

    async recoverPassword(dto: PasswordRecoverDto): Promise<void> {
        if (!this.emailExists(dto.emailOrNickname) && !this.nicknameExists(dto.emailOrNickname)) this.errorService.throw('errors.userNotFound');

        let user: UserDto = null;
        if (this.isEmail(dto.emailOrNickname)) {
            user = await this.userRepository.findOne({ where: { email: dto.emailOrNickname }});
        } else {
            user = await this.userRepository.findOne({ where: { nickname: dto.emailOrNickname }});
        }
        if (!user) this.errorService.throw('errors.userNotFound');

        const recoverCode = this.generateActionToken();
        user.actionToken = recoverCode;
        user.actionTokenValidity = this.dateService.getFutureDate(0, 1);
        await this.userRepository.save(user);
        
        const emailData: EmailReplaceToken[] = [
            { token: '$user_name', value: user.nickname },
            { token: '$recover_code_1', value: recoverCode },
            { token: '$recover_code_2', value: recoverCode },
        ];
        this.emailService.sendEmail(user.email, EmailType.PasswordRecover, emailData);
    }

    async resetPassword(dto: PasswordResetDto): Promise<void> {
        const user = await this.userRepository.findOne({ where: { actionToken: dto.actionToken }});
        if (!user || this.dateService.checkIfNextEventAvailable(user.actionTokenValidity)) this.errorService.throw('errors.invalidResetCode');

        const newPassword = await this.hashPassword(dto.newPassword);
        user.password = newPassword;
        user.actionTokenValidity = this.dateService.getPastDate(0, 0, 1);
        await this.userRepository.save(user);
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    async validatePassword(password: string, hashedPassword: string): Promise<any> {
        return bcrypt.compare(password, hashedPassword);
    }

    private async emailExists(email: string): Promise<boolean> {
        const users = await this.userRepository.find({ where: { email: email }});

        return users.length > 0;
    }

    private async nicknameExists(nickname: string): Promise<boolean> {
        const users = await this.userRepository.find({ where: { nickname: nickname }});

        return users.length > 0;
    }

    private generateActionToken(): string {
        return Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
    }

    private isEmail(email: string): boolean {
        return email.includes('@') && email.includes('.');
    }
}
