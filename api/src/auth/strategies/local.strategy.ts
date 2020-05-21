import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { compare } from 'bcryptjs';

import AuthService from '../auth.service';
import User from '../../entities/user.entity';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwrodField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new BadRequestException('User not found');
    }

    return user;
  }
}
