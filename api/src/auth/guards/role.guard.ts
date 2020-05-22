import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    const [rolesUser] = user.roles.map(role => role.name);
    const findRole = roles.filter(role => role === rolesUser);

    if (findRole.length > 0) {
      return true;
    }

    throw new HttpException('UNAUTHORIZED access', HttpStatus.UNAUTHORIZED);
  }
}
