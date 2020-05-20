import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles =
      this.reflector.get<string[]>('roles', context.getHandler()) || [];
    const request = context.switchToHttp().getRequest();
    if (!roles) return false;

    const { user } = request;

    // return this.matchRoles(roles, user.roles);
    return true;
  }

  // matchRoles(roles: string[], userRoles: string[]): boolean {}
}
