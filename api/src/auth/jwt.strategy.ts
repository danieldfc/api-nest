import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import AuthService from './auth.service';
// import User from '../users/users.entity';

import jwtConstants from './config/constants';

interface IPayloadValidate {
  id: string;
}

interface IRequestPayload {
  sub: string;
  name: string;
  iat: number;
}

@Injectable()
export default class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.jwt.secret,
    });
  }

  async validate({ sub: id }: IRequestPayload): Promise<IPayloadValidate> {
    return { id };
  }
}
