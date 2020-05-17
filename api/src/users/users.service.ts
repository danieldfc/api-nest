import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorResponse } from './shared/errorResponse';
import UsersRepository from './users.repository';
import ICreateUserDTO from './dtos/ICreateUserDTO';
import User from './users.entity';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly userRepo: UsersRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async signup(user: ICreateUserDTO): Promise<ErrorResponse[] | User> {
    const userExit = await this.userRepo.findOne({
      where: { email: user.email },
    });

    if (userExit) {
      return [
        {
          path: 'email',
          message: 'invalid email or password',
        },
      ];
    }

    return await this.userRepo.save(user);
  }
}
