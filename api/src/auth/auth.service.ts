import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import UserService from '../users/users.service';
import User from '../users/users.entity';

interface IValidateUser {
  email: string;
  password: string;
}

@Injectable()
export default class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: IValidateUser): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);

    const compareHash = await compare(password, user.password);

    if (user && compareHash) {
      delete user.password;

      return user;
    }

    return null;
  }

  async login({ id: sub }: any) {
    return {
      access_token: this.jwtService.sign({ sub }),
    };
  }
}
