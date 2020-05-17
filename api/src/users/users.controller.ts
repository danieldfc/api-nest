import { Controller, Inject, Get } from '@nestjs/common';
import UsersService from './users.service';
import User from './users.entity';

@Controller('users')
export default class UsersController {
  constructor(@Inject('UsersService') private usersService: UsersService) {}

  @Get()
  async index(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
