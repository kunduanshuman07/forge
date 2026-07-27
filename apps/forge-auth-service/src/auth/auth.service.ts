import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async signup(signupDto: SignupDto) {
        const email = signupDto.email.toLowerCase();

        const existingEmail = await this.usersService.findByEmail(email);

        if (existingEmail) {
            throw new ConflictException('Email already exists.');
        }

        const existingUsername = await this.usersService.findByUsername(
            signupDto.username,
        );

        if (existingUsername) {
            throw new ConflictException('Username already exists.');
        }

        const passwordHash = await bcrypt.hash(signupDto.password, 12);

        const user = await this.usersService.create({
            email,
            username: signupDto.username,
            passwordHash,
            firstName: signupDto.firstName,
            lastName: signupDto.lastName,
        });

        const tokens = await this.generateTokens(user.id, user.email);

        const refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 12);

        await this.usersService.updateRefreshToken(
            user.id,
            refreshTokenHash,
        );

        const verificationToken = randomBytes(32).toString('hex');

        const verificationTokenExpiry = new Date(
            Date.now() + 1000 * 60 * 60 * 24,
        );

        await this.usersService.updateVerificationToken(
            user.id,
            verificationToken,
            verificationTokenExpiry,
        );

        return {
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            ...tokens,
        };
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(
            loginDto.email.toLowerCase(),
        );

        if (!user) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const passwordMatched = await bcrypt.compare(
            loginDto.password,
            user.passwordHash,
        );

        if (!passwordMatched) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const tokens = await this.generateTokens(user.id, user.email);

        const refreshTokenHash = await bcrypt.hash(
            tokens.refreshToken,
            12,
        );

        await this.usersService.updateRefreshToken(
            user.id,
            refreshTokenHash,
        );

        return {
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            ...tokens,
        };
    }

    async refresh(
        userId: string,
        refreshToken: string,
    ) {
        const user = await this.usersService.findById(userId);

        if (!user || !user.refreshTokenHash) {
            throw new UnauthorizedException();
        }

        const matched = await bcrypt.compare(
            refreshToken,
            user.refreshTokenHash,
        );

        if (!matched) {
            throw new UnauthorizedException(
                'Invalid refresh token.',
            );
        }

        const tokens = await this.generateTokens(
            user.id,
            user.email,
        );

        const hash = await bcrypt.hash(
            tokens.refreshToken,
            12,
        );

        await this.usersService.updateRefreshToken(
            user.id,
            hash,
        );

        return tokens;
    }

    async logout(userId: string) {
        await this.usersService.updateRefreshToken(
            userId,
            null,
        );

        return null;
    }

    private async generateTokens(
        userId: string,
        email: string,
    ) {
        const payload = {
            sub: userId,
            email,
        };

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow<string>(
                'JWT_ACCESS_SECRET',
            ),
            expiresIn: this.configService.getOrThrow<string>(
                'JWT_ACCESS_EXPIRES_IN',
            ) as any,
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow<string>(
                'JWT_REFRESH_SECRET',
            ),
            expiresIn: this.configService.getOrThrow<string>(
                'JWT_REFRESH_EXPIRES_IN',
            ) as any,
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async verifyEmail(token: string) {
        const user =
            await this.usersService.findByVerificationToken(
                token,
            );

        if (!user) {
            throw new UnauthorizedException(
                'Invalid verification token.',
            );
        }

        if (
            !user.verificationTokenExpiry ||
            user.verificationTokenExpiry < new Date()
        ) {
            throw new UnauthorizedException(
                'Verification token has expired.',
            );
        }

        await this.usersService.verifyUser(user.id);

        return {
            verified: true,
        };
    }
}