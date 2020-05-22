import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import AuthService from '../auth.service';
import User from '../../entities/user.entity';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AuthService') private authService: AuthService) {
    super({
      usernameField: 'email',
      passwrodField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
