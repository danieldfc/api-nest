import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';

import jwtConstants from '../config/constants';
import AuthService from '../auth.service';
import { IPayloadAuth } from '../models/IAuthService';

@Injectable()
export default class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.jwt.secret,
    });
  }

  async validate(payload: IPayloadAuth, done: VerifiedCallback) {
    const user = await this.authService.validateById(payload.sub);
    if (!user) {
      return done(
        new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
        false,
      );
    }

    return done(null, user, payload.sub);
  }
}
