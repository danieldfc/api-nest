import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { UsersService } from './shared/users.service';
import { User } from './shared/user';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async index(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async show(@Param('id') id: number): Promise<User | undefined> {
    return this.usersService.findById(id);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.usersService.save({ ...user, id });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    this.usersService.delete(id);
  }
}
