import { Controller, UseGuards, Get, Post, Req } from '@nestjs/common';
import LocalAuthGuard from './local-auth.guard';

import { Request } from 'express';

@Controller('auth')
export default class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return req.user;
  }
}
