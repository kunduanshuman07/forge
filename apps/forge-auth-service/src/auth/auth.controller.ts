import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignupDto } from './dto/signup.dto';
import { SuccessResponse } from '../common/responses/success.response';
import { Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetCurrentUser } from './decorators/get-current-user.decorator';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const result = await this.authService.signup(signupDto);

    return SuccessResponse({
      message: 'User registered successfully.',
      data: result,
    });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);

    return SuccessResponse({
      message: 'Login successful.',
      data: result,
    });
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(
    @GetCurrentUser('userId') userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    const result = await this.authService.refresh(
      userId,
      refreshToken,
    );

    return SuccessResponse({
      message: 'Token refreshed successfully.',
      data: result,
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@GetCurrentUser() user: any) {
    return SuccessResponse({
      message: 'User fetched successfully.',
      data: user,
    });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @GetCurrentUser() user: any,
  ) {
    const result = await this.authService.logout(user.userId);

    return SuccessResponse({
      message: 'Logout successful.',
      data: result,
    });
  }

  @Get('verify-email/:token')
  async verifyEmail(
    @Param('token') token: string,
  ) {
    const result =
      await this.authService.verifyEmail(token);

    return SuccessResponse({
      message: 'Email verified successfully.',
      data: result,
    });
  }
}