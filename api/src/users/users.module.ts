import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../database/database.module';
import UsersProvider from './users.providers';
import UsersService from './users.service';
import UsersController from './users.controller';

import User from '../entities/user.entity';

@Module({
  providers: [...UsersProvider, UsersService],
  imports: [TypeOrmModule.forFeature([User]), DatabaseModule],
  controllers: [UsersController],
  exports: [UsersService],
})
export default class UsersModule {}
