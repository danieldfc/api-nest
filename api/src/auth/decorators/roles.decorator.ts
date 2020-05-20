import { SetMetadata } from '@nestjs/common';

const Roles = (...roles: string[]) => SetMetadata('roles', roles);

export const ConstantsRoles = {
  Administrator: 'Administrator',
  User: 'User',
};

export default Roles;
