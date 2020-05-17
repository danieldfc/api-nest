import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import User from '../db/models/user.entity';
import ICreateUserDTO from './dtos/ICreateUserDTO';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
  public createUser = async (userDto: ICreateUserDTO): Promise<User> => {
    const user = this.create(userDto);
    return this.save(user);
  };

  public findByEmail = async (email: string): Promise<User | undefined> => {
    return this.findOneOrFail({
      where: { email },
    });
  };

  public findById = async (id: number): Promise<User | undefined> => {
    return this.findOneOrFail(id);
  };

  public updateUser = async (
    id: number,
    userDto: ICreateUserDTO,
  ): Promise<User | undefined> => {
    const user = await this.findById(id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.name = userDto.name;
    user.email = userDto.email;
    user.password = userDto.password;

    delete user.password;

    return await this.save(user);
  };
}
