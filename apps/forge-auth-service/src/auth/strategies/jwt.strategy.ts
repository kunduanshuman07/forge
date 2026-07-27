import {
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { PassportStrategy } from '@nestjs/passport';
  import { ExtractJwt, Strategy } from 'passport-jwt';
  
  import { UsersService } from '../../users/users.service';
  
  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
      configService: ConfigService,
      private readonly usersService: UsersService,
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
      });
    }
  
    async validate(payload: { sub: string; email: string }) {
      const user = await this.usersService.findById(payload.sub);
  
      if (!user) {
        throw new UnauthorizedException('User not found.');
      }
  
      if (!user.isActive) {
        throw new UnauthorizedException('User account is deactivated.');
      }
  
      return {
        userId: user.id,
        email: user.email,
        username: user.username,
      };
    }
  }