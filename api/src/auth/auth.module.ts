import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import AuthController from './auth.controller';
import AuthService from './auth.service';
import UserModule from '../users/users.module';
import LocalStrategy from './local.strategy';
import JWTStrategy from './jwt.strategy';

import Constants from './config/constants';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: Constants.jwt.secret,
      signOptions: { expiresIn: Constants.jwt.expiriesIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JWTStrategy],
  exports: [JWTStrategy],
})
export default class AuthModule {}
