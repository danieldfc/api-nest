import { Injectable } from '@nestjs/common';

import { User } from './user';

@Injectable()
export class UsersService {
  private users: User[];

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: number): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === Number(id));

    if (!findUser) {
      throw new Error('User not found');
    }

    return findUser;
  }
  private id = 1;
  public async create(user: User): Promise<User> {
    const findUser = this.users.find(Iuser => Iuser.name === user.name);

    if (findUser) {
      throw new Error('User already exist');
    }

    this.id = this.id + 1;
    this.users.push({ ...user, id: this.id });

    return user;
  }

  public async save(user: User): Promise<User> {
    const findUser = this.users.find(
      entityUser => entityUser.email === user.email,
    );

    if (!findUser) {
      throw new Error('User not found');
    }

    Object.assign(user, {
      id: Number(user.id),
      name: user.name,
      email: user.email,
      password: user.password,
    });

    delete user.password;

    return user;
  }

  public async delete(id: number): Promise<void> {
    const findUser = this.users.findIndex(user => user.id === id);

    if (!findUser) {
      throw new Error('User not found');
    }

    this.users.splice(findUser, 1);
  }
}
