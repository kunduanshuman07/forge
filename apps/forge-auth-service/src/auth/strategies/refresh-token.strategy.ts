import {
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { PassportStrategy } from '@nestjs/passport';
  import { ExtractJwt, Strategy } from 'passport-jwt';
  
  import { UsersService } from '../../users/users.service';
  
  @Injectable()
  export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
  ) {
    constructor(
      configService: ConfigService,
      private readonly usersService: UsersService,
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: configService.getOrThrow<string>(
          'JWT_REFRESH_SECRET',
        ),
        passReqToCallback: true,
      });
    }
  
    async validate(
      req: Request & {
        headers: {
          authorization?: string;
        };
      },
      payload: {
        sub: string;
        email: string;
      },
    ) {
      const refreshToken =
        req.headers.authorization?.replace('Bearer ', '');
  
      if (!refreshToken) {
        throw new UnauthorizedException();
      }
  
      const user = await this.usersService.findById(payload.sub);
  
      if (!user || !user.refreshTokenHash) {
        throw new UnauthorizedException();
      }
  
      return {
        userId: user.id,
        email: user.email,
        refreshToken,
      };
    }
  }