import { Controller, UseGuards, Post, Req } from '@nestjs/common';
import LocalAuthGuard from './guards/local-auth.guard';
import AuthService from './auth.service';

import { Request } from 'express';

@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }
}
