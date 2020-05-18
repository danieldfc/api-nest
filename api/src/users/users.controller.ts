import {
  Controller,
  Inject,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import UsersService from './users.service';
import User from './users.entity';
import ICreateUserDTO from './dtos/ICreateUserDTO';
import JwtAuthGuard from '../auth/jwt-guard.guard';

interface IRequest {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@Controller('users')
export default class UsersController {
  constructor(@Inject('UsersService') private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async show(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() user: ICreateUserDTO): Promise<User> {
    const createUser = await this.usersService.create(user);

    delete createUser.password;

    return createUser;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() user: IRequest): Promise<User> {
    const updateUser = await this.usersService.save({ ...user, user_id: id });

    delete updateUser.password;

    return updateUser;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.usersService.delete(id);
  }
}
