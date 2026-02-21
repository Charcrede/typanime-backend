// auth/auth.controller.ts
import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import 'dotenv'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /* ---------------- GOOGLE ---------------- */

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // Passport s'en occupe (redirection Google)
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.loginOAuth(req.user);

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return res.redirect(`${process.env.FRONT_URL}/dashboard`);
  }

  /* ---------------- GITHUB ---------------- */

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubAuth() {
    // Passport s'en occupe
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.loginOAuth(req.user);

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return res.redirect(`${process.env.FRONT_URL}/dashboard`);
  }
}