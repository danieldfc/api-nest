import { Module } from '@nestjs/common';
import UsersService from './users.service';
import UsersController from './users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export default class UsersModule {}
