import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/api/user/model/user.interface';
import { SALT_ROUNDS } from 'src/configuration/user.config';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ) {}

    async generateJwt(user: IUser): Promise<string> {
        return this.jwtService.signAsync({ user });
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, SALT_ROUNDS);
    }

    async validatePassword(password: string, hashedPassword: string): Promise<any> {
        return bcrypt.compare(password, hashedPassword);
    }
}
