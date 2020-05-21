import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import matchRoles from '../middlewares/match-roles.middleware';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from 'src/users/users.repository';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(
    @InjectRepository(UserRepository)
    private userRespository: UserRepository,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = await context.switchToHttp().getRequest();
    const { user } = request;

    if (user && user.roles) {
      return true;
    }

    throw new HttpException('UNAUTHORIZED access', HttpStatus.UNAUTHORIZED);
  }
}
