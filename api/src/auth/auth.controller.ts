import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import LocalAuthGuard from './guards/local-auth.guard';
import AuthService from './auth.service';
import User from 'src/entities/user.entity';
import UsersService from 'src/users/users.service';
import ILoginDTO from '../users/dtos/IloginDTO';

interface IPayloadResponse {
  user: User;
  token: string;
}

@Controller('auth')
export default class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() login: ILoginDTO): Promise<IPayloadResponse> {
    const user = await this.userService.findByLogin(login);

    const payload = {
      email: user.email,
    };

    const token = await this.authService.login(payload);

    delete user.password;

    return { user, token };
  }
}
