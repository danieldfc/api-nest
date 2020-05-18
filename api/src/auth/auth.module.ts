import { Module } from '@nestjs/common';

import AuthController from './auth.controller';
import AuthService from './auth.service';
import UserModule from '../users/users.module';
import LocalStrategy from './local.strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export default class AuthModule {}
