import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import AuthController from './auth.controller';
import AuthService from './auth.service';
import UserModule from '../users/users.module';
import LocalStrategy from './strategies/local.strategy';
import JWTStrategy from './strategies/jwt.strategy';

import Constants from './config/constants';

const { secret, expiresIn } = Constants.jwt;

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret,
      signOptions: {
        expiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JWTStrategy],
  exports: [JWTStrategy],
})
export default class AuthModule {}
