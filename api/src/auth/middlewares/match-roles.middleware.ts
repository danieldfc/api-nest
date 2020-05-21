import User from 'src/entities/user.entity';

export default function matchRoles(
  roles: string[],
  userRoles: User,
): Promise<boolean> {
  console.log(roles, userRoles);
  return new Promise(() => true);
}
