import Role from '../../entities/role.entity';
import Permission from '../../entities/permission.entity';

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  roles: Role[];
  permissions: Permission[];
}
