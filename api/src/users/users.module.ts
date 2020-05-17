import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserRespository from './users.repository';
import UsersController from './users.controller';
import UsersService from './users.service';
import UsersProvider from './users.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [...UsersProvider, UsersService],
  imports: [TypeOrmModule.forFeature([UserRespository]), DatabaseModule],
  controllers: [UsersController],
})
export default class UsersModule {}
