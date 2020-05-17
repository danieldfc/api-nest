import {
  Controller,
  Inject,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import UsersService from './users.service';
import User from './users.entity';
import ICreateUserDTO from './dtos/ICreateUserDTO';

interface IRequest {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@Controller('users')
export default class UsersController {
  constructor(@Inject('UsersService') private usersService: UsersService) {}

  @Get()
  async index(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Post()
  async create(@Body() user: ICreateUserDTO): Promise<User> {
    const createUser = await this.usersService.create(user);

    delete createUser.password;

    return createUser;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: IRequest): Promise<User> {
    const updateUser = await this.usersService.save({ ...user, user_id: id });

    delete updateUser.password;

    return updateUser;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.usersService.delete(id);
  }
}
