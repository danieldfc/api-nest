import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import UserService from '../users/users.service';
import User from '../entities/user.entity';

import IAuthService from './models/IAuthService';
import Constants from './config/constants';

const { expiresIn, secret } = Constants.jwt;

export interface IValidateUser {
  email: string;
}

export interface IAccessToken {
  access_token: string;
}

@Injectable()
export default class AuthService implements IAuthService {
  constructor(private usersService: UserService) {}

  async validateUser({ email }: IValidateUser): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) return null;

    return user;
  }

  async login(payload: any): Promise<string> {
    return sign(payload, secret, { expiresIn });
  }
}
