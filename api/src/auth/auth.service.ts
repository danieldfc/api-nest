import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import UserService from '../users/users.service';
import User from '../entities/user.entity';

import IAuthService from './models/IAuthService';
import { IRequestPayload } from './strategies/jwt.strategy';

export interface IValidateUser {
  email: string;
  password: string;
}

export interface IAccessToken {
  access_token: string;
}

@Injectable()
export default class AuthService implements IAuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: IValidateUser): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) return null;

    const compareHash = await compare(password, user.password);

    if (!compareHash) return null;

    delete user.password;

    return user;
  }

  async login({ sub }: IRequestPayload): Promise<IAccessToken> {
    return {
      access_token: this.jwtService.sign({ sub }),
    };
  }
}
