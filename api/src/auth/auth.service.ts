import { Injectable, Inject } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import UserService from '../users/users.service';
import IAuthService, { IRequestJWTPayload } from './models/IAuthService';

import Constants from './config/constants';

import User from '../entities/user.entity';

const { expiresIn, secret } = Constants.jwt;

@Injectable()
export default class AuthService implements IAuthService {
  constructor(@Inject('UsersService') private usersService: UserService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.validateLoginWithRoles(
      email,
      password,
    );

    if (!user) return null;

    return user;
  }

  async validateById(id: string): Promise<User | null> {
    const user = await this.usersService.validateIdWithRoles(id);

    if (!user) return null;

    return user;
  }

  async login({ sub: subject }: IRequestJWTPayload): Promise<string> {
    return sign({}, secret, { expiresIn, subject });
  }
}
