import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import UsersRepository from './users.repository';
import ICreateUserDTO from './dtos/ICreateUserDTO';
import User from './users.entity';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'name', 'email', 'created_at', 'updated_at'],
    });
  }

  async findById(id: string): Promise<User | undefined> {
    const userExist = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'created_at', 'updated_at'],
    });

    if (!userExist) {
      throw new NotFoundException('User not found');
    }

    return userExist;
  }

  async create(user: ICreateUserDTO): Promise<User> {
    const userExist = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (userExist) {
      throw new UnauthorizedException('User already exist');
    }

    user.password = await hash(user.password, 8);

    return await this.usersRepository.save(user);
  }

  async save({
    user_id,
    email,
    name,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findOne(user_id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const duplicatedEmail = await this.usersRepository.findOne({
      where: { email },
    });

    if (duplicatedEmail && duplicatedEmail.id !== user_id) {
      throw new UnauthorizedException('E-mail is already in use.');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new BadRequestException(
        'You need to inform the old password to set a new password.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new BadRequestException('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    return this.usersRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const userExist = await this.usersRepository.findOne(id);

    if (!userExist) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.delete(id);
  }
}
