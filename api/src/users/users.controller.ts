import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import RepoService from '../repo.service';
import UserRepository from './user.repository';

import User from '../db/models/user.entity';
import ICreateUserDTO from './dtos/ICreateUserDTO';

@Controller('users')
export default class UsersController {
  constructor(
    protected readonly repoService: RepoService,
    protected readonly userRepository: UserRepository,
  ) {}

  @Get()
  async index(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  @Get(':id')
  async show(@Param('id') id: number): Promise<User | undefined> {
    return this.repoService.userRepo.findOne(id);
  }

  @Post()
  async create(@Body() user: ICreateUserDTO): Promise<User | undefined> {
    const checkUserEmail = this.userRepository.findByEmail(user.email);

    if (checkUserEmail) {
      throw new BadRequestException('User already exists');
    }

    const createdUser = this.repoService.userRepo.create(user);

    return this.userRepository.save(createdUser);
  }

  @Put(':id')
  async update(@Param('id') id: number): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.userRepository.save(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.repoService.userRepo.delete(id);
  }
}
