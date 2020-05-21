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
import User from '../entities/user.entity';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';

import Roles, { ConstantsRoles } from '../auth/decorators/roles.decorator';
import RolesGuard from '../auth/guards/role.guard';
import ICreateUserDTO from './dtos/ICreateUserDTO';

interface IRequestUpdateUser {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@Controller('users')
@UseGuards(RolesGuard)
export default class UsersController {
  constructor(@Inject('UsersService') private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(ConstantsRoles.User, ConstantsRoles.Administrator)
  @Get()
  async index(): Promise<void> {
    // return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(ConstantsRoles.User, ConstantsRoles.Administrator)
  @Get(':id')
  async show(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(ConstantsRoles.Administrator)
  @Post()
  async create(@Body() user: ICreateUserDTO): Promise<User> {
    const createUser = await this.usersService.create(user);

    delete createUser.password;

    return createUser;
  }

  @UseGuards(JwtAuthGuard)
  @Roles(ConstantsRoles.User, ConstantsRoles.Administrator)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: IRequestUpdateUser,
  ): Promise<User> {
    const updateUser = await this.usersService.save({ ...user, user_id: id });

    delete updateUser.password;

    return updateUser;
  }

  @UseGuards(JwtAuthGuard)
  @Roles(ConstantsRoles.Administrator)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.usersService.delete(id);
  }
}
